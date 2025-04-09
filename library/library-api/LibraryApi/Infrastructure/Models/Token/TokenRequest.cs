using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace LibraryApi.Infrastructure.Models.Token
{
    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class TokenRequest
    {

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

    }

    [JsonObject(NamingStrategyType = typeof(CamelCaseNamingStrategy))]
    public class SignupRequest : TokenRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}