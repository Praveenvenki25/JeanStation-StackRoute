using System.Collections.Generic;
using UserAPI.Models;

namespace UserAPI.Service
{
    public interface IUserService
    {
        int RegisterUser(User user);
        User Login(string EmailAddress, string Password);
        List<User> GetUsers();
        User GetUserById(string UserId);
        int UpdateUser(string UserId,User user);
        int DeleteUserById(string UserId);

        public List<Address> GetAddressbyUserId(string UserId);
        public int AddAddress(Address Address);
        public int UpdateAddress(string addressId, Address Address);
        public int DeleteAddress(string addressId);
        public Address GetAddressByAddressId(string AddressId);

        public User GetUserbyEmail(string EmailAddress);
    }
}
