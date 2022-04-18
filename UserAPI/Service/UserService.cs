using System.Collections.Generic;
using UserAPI.Exceptions;
using UserAPI.Models;
using UserAPI.Repository;

namespace UserAPI.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository repo;
        public UserService(IUserRepository userrepo)
        {
            this.repo = userrepo;
        }
        public int DeleteUserById(string UserId)
        {
            var user1=repo.GetUserById(UserId);
            if (user1 == null)
            {
                throw new UserNotFoundException($"User with UserId: {UserId} does not exists");
            }
            return repo.DeleteUserById(user1.UserId);
        }

        public User GetUserById(string UserId)
        {
            var user1=repo.GetUserById(UserId);
            if(user1 == null)
            {
                throw new System.Exception($"User with userId: {UserId} does not exists");
            }
            return user1;
        }

        public List<User> GetUsers()
        {
           return repo.GetUsers();
        }

        public User Login(string EmailAddress, string Password)
        {
            var user1= repo.Login(EmailAddress, Password);
            if (user1 == null)
            {
                throw new UserNotFoundException($"User with the email : {EmailAddress} does not exists");
            }
            return user1;
        }

        public int RegisterUser(User user)
        {
            user.Role = "Customer";
            var user1=repo.RegisterUser(user);
            if( user1 == 1) 
            {
                return user1;
            }
            throw new UserAlreadyExistsEception($"User with userId: {user.UserId} already exists");

        }

        public int UpdateUser(string UserId,User user)
        {
            var UpdateUser=repo.UpdateUser(UserId,user);
            if (UpdateUser == 1)
            {
                return UpdateUser;
            }
            throw new UserAlreadyExistsEception($"User with user Details already exists");
        }
        public List<Address> GetAddressbyUserId(string UserId)
        {
            return repo.GetAddressbyUserId(UserId);
            
        }
        public int AddAddress(Address Address)
        {
            var address1=repo.GetAddressByAddressId(Address.AddressId);
            if(address1 == null)
            {
                return repo.AddAddress(Address);
            }
            throw new AddressAlreadyExistsException($"Address already Exists for the user with addressId:{Address.AddressId}");
        }
        public Address GetAddressByAddressId(string AddressId)
        {
            var address1=repo.GetAddressByAddressId(AddressId);
            if( address1 == null)
            {
                throw new AddressNotFoundException($"Address with Address Id: {AddressId} does not Exists");
            }
            return address1;

        }
        public int UpdateAddress(string addressId, Address Address)
        {
            var address1=repo.GetAddressByAddressId(addressId);
            if(address1 != null)
            {
                return repo.UpdateAddress(addressId, Address);
            }
            throw new AddressNotFoundException($"Address with Address Id: {addressId} does not exists");

        }
        
        public int DeleteAddress(string addressId)
        {
            var address1 = repo.GetAddressByAddressId(addressId);
            if(address1 == null)
            {
                throw new AddressNotFoundException($"Address with Address Id: {addressId} does not exists");
            }
            return repo.DeleteAddress(addressId);
        }

        public User GetUserbyEmail(string EmailAddress)
        {
            var user=repo.GetUserbyEmail(EmailAddress);
            if(user == null)
            {
                throw new UserNotFoundException($"User with Email:{EmailAddress} Does not Exist");
            }
            return user;
        }
    }
}
