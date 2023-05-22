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
`src/main/java/com/sarah/payroll/Employee.java`
This file has the data type for Employee. The class definition provides a constructor used to instantiate objects with intial attributes. the class also overides the `equal` method to provide the more applicable application of comparing the id, name and description. Another interesting method is the `toString` method which was also overriden to output a description of the object as a string instead of the class name and a hexidecimal representation of the hash code of the object.

`@Entity` is used by JPA to denote the class for storage in a relational table. `@Id` and `@GeneratedValue` are JPA annotations to note the primary key which is generated automatically as needed.

`@Version` and `@JsonIgnore` we added to implement **versioning**. This means an Etag with the version of the element can be compared and objects can be updated only if the current version is not stale. 

`src/main/java/com/sarah/payroll/EmployeeRepository.java`
This is the code repository. It uses the employee object type and its primary key. By extending PagingAndSortingRepository interface it comes with pre- defined methods.

We extended PagingAndSortingRepository because it adds extra options for setting page size and navigational links to hop to different pages like the first or next page for example. This allowed us to implement **pagination**. *Note* that the navigational links are fluidly updated based on the page size. There is also an input in the frontend UI for changing the size, or number of records fetched and displayed.

Spring Data is able to write JPA queries for you. This cuts down dev time and reduces bugs and errors. Spring does this by looking at names of methods in repository class and determines which operations you need including all the basic CRUD actions.

`src/main/java/com/greglturnquist/payroll/DatabaseLoader.java`
This file loads the database with a single employee, Frodo Baggins. Using `@Component` is Spring's annotation so it is picked up by the Spring Application Context.

Beans are instances of objects identified and managed by the application context. Spring mainly identifies these beans and dependency management.

The DatabaseLoader class also implements the CommandLineRunner which is so that it is run after all the beans are created and regesterd.

`/src/main/java/com/sarah/payroll/PayrollApplication.java`
The project needs an entry point, a main function where the program starts executing code. This is the `public static void main` method, and we defined it in this file. Besides using `./mvnw spring-boot:run` to execute the program you could also run the `main()` method from this file.

`src/main/java/com/greglturnquist/payroll/HomeController.java`
This file is used to set up a Spring MVC controller. The `@Controller` marks the class as a controller. Controllers are used for interpreting incoming requests, sending them for further processing and advancing data to the View for processing. `@RequestMapping` marks the `index()` method for the `/` route and returns the string `index` as the name of the template. Spring Boot is autoconfigured to map it to the location of the following file.

`src/main/resources/templates/index.html`
This is the HTML template. Note that there is a `<div id="react"></div>` that is where React is directed to plug input. The `<script>` tag imports a JS bundle file that is built in target folder allowing the dependencies to be cleaned and reinstalled as needed.

`frontend-maven-plugin` is added to the `pom.xml` build file. Which handles installing `node.js` and `npm` . It also handles `npm` commands to install dependencies for the front end into a `package.json file`. Another thing it has is a webpack command that is usefull for compiling JS.

#### API
You can access the API using cURL, Postman, or any other service. 

Here is a sample command and output:
```
$ curl localhost:8080/api
{
  "_links" : {
    "employees" : {
      "href" : "http://localhost:8080/api/employees"
    },
    "profile" : {
      "href" : "http://localhost:8080/api/profile"
    }
  }
}
```

The output is a HAL-formatted JSON document. It includes a collection of avaible links: `_links`, an `employees` object which is the roote of the employees object defined by `EmployeeRepository`, and a `profile` which is metadata about the service.

Another example command and output:

```
$ curl localhost:8080/api/employees
{
  "_embedded" : {
    "employees" : [ {
      "firstName" : "Frodo",
      "lastName" : "Baggins",
      "description" : "ring bearer",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/employees/1"
        }
      }
    } ]
  }
}
```

In this example it shows `_links` which is used by the front end to navigate to different pages.

Other commands:
```
curl localhost:8080/api/employees/1
curl -X POST localhost:8080/api/employees -d "{\"firstName\": \"Bilbo\", \"lastName\": \"Baggins\", \"description\": \"burglar\"}" -H "Content-Type:application/json"
```

### Front End
The focus of this project was the Backend implementation with Java. 
Currently there are some bugs with pagination due to where the code goes after creating or updating a record. I am currently working on fixing this issue.

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

webpack
- A toolkit used to compile JavaScript components into a single, loadable bundle

babel
- To write your JavaScript code using ES6 and compile it into ES5 to run in the browser

## License

[MIT](https://choosealicense.com/licenses/mit/)