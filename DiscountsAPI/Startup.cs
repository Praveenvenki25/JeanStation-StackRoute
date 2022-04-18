using DiscountsAPI.Context;
using DiscountsAPI.Respository;
using DiscountsAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DiscountsAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "DiscountsAPI", Version = "v1" });
            });
            services.AddConsulConfig(Configuration);
            services.AddDbContext<DataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DatabaseConnection")));
            services.AddScoped<IDiscountsRepository, DiscountsRepository>();
            services.AddScoped<IDiscountsService, DiscountsService>();
            services.AddCors(options => options.AddPolicy("AllowAllOrigins", policy => policy.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod()));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "DiscountsAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseConsul(Configuration);

            app.UseAuthorization();

            app.UseCors("AllowAllOrigins");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
