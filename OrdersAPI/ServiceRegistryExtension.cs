using Consul;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace OrdersAPI
{
    public static class ServiceRegistryExtension
    {
        public static IServiceCollection AddConsulConfig(this IServiceCollection services,IConfiguration configurationSetting)
        {
            services.AddSingleton<IConsulClient,ConsulClient>(p => new ConsulClient(consulConfig =>
            {
                consulConfig.Address = new System.Uri(configurationSetting["ConsulConfig:ConsulAddress"]);
            }));
            return services;

        }

        public static IApplicationBuilder UseConsul(this IApplicationBuilder app,IConfiguration configurationSetting)
        {
            var consulClient= app.ApplicationServices.GetRequiredService<IConsulClient>();
            var logger = app.ApplicationServices.GetRequiredService<ILoggerFactory>().CreateLogger("AppExtension");
            var lifetime = app.ApplicationServices.GetRequiredService<IHostApplicationLifetime>();

            var registration = new AgentServiceRegistration()
            {
                ID = configurationSetting["ConsulConfig:ServiceName"],
                Name=configurationSetting["ConsulConfig:ServiceName"],
                Address = configurationSetting["ConsulConfig:ServiceHost"],
                Port=int.Parse(configurationSetting["ConsulConfig:ServicePort"])
                
            };

            logger.LogInformation("Registering with Consul");
            consulClient.Agent.ServiceDeregister(registration.ID).ConfigureAwait(true);
            consulClient.Agent.ServiceRegister(registration).ConfigureAwait(true);

            lifetime.ApplicationStopped.Register(() =>
            {
                logger.LogInformation("Unregistering service from consul");
                consulClient.Agent.ServiceDeregister(registration.ID).ConfigureAwait(!true);
            });
            return app;
        }

    }
}
