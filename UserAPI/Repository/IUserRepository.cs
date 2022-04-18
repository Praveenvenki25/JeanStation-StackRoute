using System.Collections.Generic;
using UserAPI.Models;

namespace UserAPI.Repository
{
    public interface IUserRepository
    {
        public int RegisterUser(User user);
        public User Login(string EmailAddress,string Password);
        public List<User> GetUsers();
        public User GetUserById(string UserId);
        public int UpdateUser(string UserId,User user);
        public int DeleteUserById(string UserId);
            
        public List<Address> GetAddressbyUserId(string UserId);
        public int AddAddress(Address Address);
        public int UpdateAddress(string addressId,Address Address);
        public int DeleteAddress(string addressId);
        public Address GetAddressByAddressId(string AddressId);
        public User GetUserbyEmail(string Email);
    }
}
