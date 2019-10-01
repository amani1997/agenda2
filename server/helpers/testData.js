import Helper from './helper'
const testData = {
   newUser: {
    firstName: "amani",
    lastName: "murera",
    email: "usertest001@gmail.com",
    password: "passwrdpass"
   },
   unmatchedData: {
    firstName: "amani",
    lastName: "murera",
    email: "usertest001@gmail.com",
    password: "passwrdpas"
   },
   unexistData: {
    firstName: "amani",
    lastName: "murera",
    email: "undefined@gmail.com",
    password: "passwrdpass"
   },
   newEntry: {
    title: "hello",
	description: "hhhhbvhhhh"
   }
}
const token = Helper.generateToken('usertest001@gmail.com');
export default {testData, token};