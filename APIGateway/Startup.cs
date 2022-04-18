using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Ocelot.Authorization;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Consul;

namespace APIGateway
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("AllowAllOrigins", policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
            services.AddOcelot().AddConsul();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the secret code: JeanStation200"));
            //services.AddCors();
           
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer("token", o => o.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
            {
                ValidateIssuer = false,
                //ValidIssuer = "userapi",
                ValidateAudience = false,
                //ValidAudience = "userapi",
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            var configuration = new OcelotPipelineConfiguration
            {
                AuthorizationMiddleware = async (ctx, next) =>
                {
                    if (this.Authorize(ctx))
                    {
                        await next.Invoke();
                    }
                    else
                    {
                        ctx.Items.SetError(new UnauthorizedError($"Fail to authorize"));
                    }
                }
            };

            app.UseRouting();
            app.UseCors("AllowAllOrigins");
            app.UseOcelot(configuration).Wait();
            app.UseAuthentication().UseAuthorization();
            
           // app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Hello World!");
                });
            });
        }

        private bool Authorize(HttpContext ctx)
        {
            bool auth = false;
            Claim[] claims = ctx.User.Claims.ToArray<Claim>();
            Dictionary<string, string> required = ctx.Items.DownstreamRoute().RouteClaimsRequirement;
            string userrole;
            required.TryGetValue("UserRole", out userrole);
            if(userrole == null)
            {
                return true;
            }
            var roles = userrole.Split(", ");
            
            foreach (var role in roles)
            {
                if (role == claims[1].Value)
                {
                    auth = true;
                    break;
                }
            }
            return auth;
        }
    }
}
