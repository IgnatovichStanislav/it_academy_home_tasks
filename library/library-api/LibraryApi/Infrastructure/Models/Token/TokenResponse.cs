namespace LibraryApi.Infrastructure.Models.Token;

public class TokenResponse
{
    public string AuthToken { get; set; }
    public User User { get; set; }
}