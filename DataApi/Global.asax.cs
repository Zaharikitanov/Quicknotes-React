using DataApi.App_Start;
using System.Web.Http;

namespace DataApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            IocContainerConfig.Configure();
            GlobalConfiguration.Configure(WebApiConfig.Register);
        }
    }
}
