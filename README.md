# Payroll

Payroll is a simple CRUD application built with a Spring boot backend using JAVA and a React frontend. It managaes a database of employees allowing you to view, add, update, and delete employes. 

## Key Features
Because Spring provides a HAL obj it was easy to implement


## Installation
Clone the reposistory to your local environment and then enter into the new folder:
```
git clone https://github.com/SarahBunker/payroll.git
cd payroll
```


## Usage
Run `npm run-script watch` to put webpack into watch mode. It will regenerate bundle.js as you edit the source.

Run `./mvnw spring-boot:run` to execute the program.

Run `mvn clean install` to delete and reinstall the dependencies.

run `git reset --hard gitID` where you replace gitID with the id of the commit you want to reset to from `git log` to revert and remove any changes to a previous commit.

## Code tour

### Backend
src/main/java/com/sarah/payroll/Employee.java
This file has the data type for Employee. The class definition provides a constructor used to instantiate objects with intial attributes. the class also overides the `equal` method to provide the more applicable application of comparing the id, name and description. Another interesting method is the `toString` method which was also overriden to output a description of the object as a string instead of the class name and a hexidecimal representation of the hash code of the object.
`@Entity` is used by JPA to denote the class for storage in a relational table. `@Id` and `@GeneratedValue` are JPA annotations to note the primary key which is generated automatically as needed.

src/main/java/com/sarah/payroll/EmployeeRepository.java
This is the code repository. It uses the employee object type and its primary key. By extending PagingAndSortingRepository interface it comes with pre- defined methods.

Spring Data is able to write JPA queries for you. This cuts down dev time and reduces bugs and errors. Spring does this by looking at names of methods in repository class and determines which operations you need including all the basic CRUD actions.

FIX ME --------------------

src/main/java/com/greglturnquist/payroll/DatabaseLoader.java
This file loads the database with a single employee, Frodo Baggins. Using `@Component` is Spring's annotation so it is picked up by the Spring Application Context.

Beans are instances of objects identified and managed by the application context. Spring mainly identifies these beans and dependency management.

The DatabaseLoader class also implements the CommandLineRunner which is so that it is run after all the beans are created and regesterd.

/src/main/java/com/sarah/payroll/PayrollApplication.java
The project needs an entry point, a main function where the program starts executing code. This is the `public static void main` method, and we defined it in this file. Besides using `./mvnw spring-boot:run` to execute the program you could also run the `main()` method from this file.

### Front End

## Dependancies

Rest Repositories
- interface that allows you to perform various operations on objects following REST standard

Thymeleaf
- used to serve HTML in web applications

JPA
- used to manage relational data in Java applications. Allows data persistance.

H2
- embedded memeroy relations database management system

Maven Project
- tool for building, publishing, and deploying JAVA projects

Spring Boot
- modulare approach for creating JAVA applications

React
- libray
- uses components to modularly build front-end

## License

[MIT](https://choosealicense.com/licenses/mit/)