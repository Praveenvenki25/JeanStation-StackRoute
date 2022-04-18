using System.Collections.Generic;
using System.Linq;
using UserAPI.Context;
using UserAPI.Models;

namespace UserAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext db;

        public UserRepository(DataContext database)
        {
            this.db= database;
        }
        public int DeleteUserById(string UserId)
        {
            var user1=db.Users.Where(x=>x.UserId == UserId).FirstOrDefault();
            db.Users.Remove(user1);
            return db.SaveChanges();
        }

        public User GetUserById(string UserId)
        {
            var user1=db.Users.Where(x => x.UserId == UserId).FirstOrDefault();
            return user1;
        }

        public List<User> GetUsers()
        {
            return db.Users.ToList();
        }

        public User Login(string EmailAddress,string Password)
        {
            return db.Users.Where(x=> x.EmailAddress == EmailAddress && x.Password==Password).FirstOrDefault();
            
        }

        public int RegisterUser(User user)
        {
            db.Users.Add(user);
            return db.SaveChanges();    
           
        }

        public int UpdateUser(string UserId,User user)
        {
            var user1 = db.Users.Where(x => x.UserId == UserId).FirstOrDefault();
            user1.UserId = user.UserId;
            user1.FirstName = user.FirstName;
            user1.LastName = user.LastName;
            user1.ContactNumber = user.ContactNumber;
            user1.Password = user.Password;
            user1.Role = user.Role;
            user1.EmailAddress = user.EmailAddress;
            db.Entry<User>(user1).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges();

        }

        public List<Address> GetAddressbyUserId(string UserId)
        {
            return db.Address.Where(x=>x.UserId == UserId).ToList();
           
        }
        public int AddAddress(Address Address)
        {
            db.Address.Add(Address);
            return db.SaveChanges();
        }
        public int UpdateAddress(string addressId, Address Address)
        {
            var address1=db.Address.Where(x=>x.AddressId == addressId).FirstOrDefault();
            address1.AddressId = Address.AddressId;
            address1.UserId = Address.UserId;
            address1.ApartmentNumber = Address.ApartmentNumber;
            address1.StreetName = Address.StreetName;
            address1.City = Address.City;
            address1.Province = Address.Province;
            address1.Postalcode = Address.Postalcode;
            db.Entry<Address>(address1).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return db.SaveChanges();
        }
        public int DeleteAddress(string addressId)
        {
            var address1=db.Address.Where(x=>x.AddressId==addressId).FirstOrDefault();
            db.Remove(address1);
            return db.SaveChanges();
        }

        public Address GetAddressByAddressId(string AddressId)
        {
            return db.Address.Where(x=>x.AddressId==AddressId).FirstOrDefault();
        }

        public User GetUserbyEmail(string Email){

            var user=db.Users.Where(x=>x.EmailAddress==Email).FirstOrDefault();
            return user;

        }
    }
}
