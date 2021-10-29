# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql
--2
create table mentors (
	id serial primary key,
	name varchar(30) not null,
	years_Glasgow varchar(12) not null,
	address varchar(120),
	programming_language varchar(30)
);

--3
INSERT INTO mentors (name, years_Glasgow, address, programming_language) 
VALUES ('John Smith', 10,'11 New Road','Javascript');

INSERT INTO mentors (name, years_Glasgow, address, programming_language) 
VALUES ('Joao da Silva', 3,'231 Old Road','React');

INSERT INTO mentors (name, years_Glasgow, address, programming_language) 
VALUES ('Ana O.', 8,'90 That street','Javascript');

INSERT INTO mentors (name, years_Glasgow, address, programming_language) 
VALUES ('Paul F.', 1,'195 This street','SQL');

INSERT INTO mentors (name, years_Glasgow, address, programming_language) 
VALUES ('Rose R.', 15,'171 New Road','NodeJs');

--4
create table students (
	id serial primary key,
	name varchar(30) not null,
	address varchar(120),
	graduated boolean
);

--5
INSERT INTO students (name, address, graduated) 
VALUES ('Rose E.', '171 Any Road', True);

INSERT INTO students (name, address, graduated) 
VALUES ('Elliot Alderson', '13 Street street', True);

INSERT INTO students (name, address, graduated) 
VALUES ('Darlene Alderson', '907 Other street', True);

INSERT INTO students (name, address, graduated) 
VALUES ('Sponge bob', 'Pineapple', False);

INSERT INTO students (name, address, graduated) 
VALUES ('Patrick Star', 'Under a rock', True);

INSERT INTO students (name, address, graduated) 
VALUES ('Ricky Sanchez', 'earth c-137', True);

INSERT INTO students (name, address, graduated) 
VALUES ('Morty Sanchez', '12 his street', False);

INSERT INTO students (name, address, graduated) 
VALUES ('Beetejuice', 'Cemetery', False);

INSERT INTO students (name, address, graduated) 
VALUES ('Jack S.', '70 Any Street', True);

INSERT INTO students (name, address, graduated) 
VALUES ('John K.', '2 main road', False);


--6
select * from mentors
select * from students


--7
create table classes(
	id serial primary key,
	leading_mentor int references mentors,
	topic varchar(30) not null,
	class_date date,
	location varchar(30)
);

--8
INSERT INTO classes (leading_mentor, topic, class_date, location) 
VALUES (3, 'Javascript', '2021-10-29', 'Barcelona');

INSERT INTO classes (leading_mentor, topic, class_date, location) 
VALUES (4, 'React', '2021-10-20', 'London');

INSERT INTO classes (leading_mentor, topic, class_date, location) 
VALUES (1, 'NodeJs', '2021-11-05', 'Madrid');


--9
create table students_attendance (
	class_id int references classes,
	student_id int references students,
);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (1, 10);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (1, 1);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (1, 3);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (1, 4);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (1, 5);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (2, 2);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (2, 6);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (3, 7);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (3, 8);

INSERT INTO students_attendance (class_id, student_id) 
VALUES (3, 9);



--10
select * from mentors where years_Glasgow > 5;

select * from mentors where programming_language='Javascript';

select * from students where graduated=True;

select * from classes where class_date < '2021-06-01';

select student_id from students_attendance where class_id=1;



```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
5. Insert 10 students in the `students` table.
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

8. Insert a few classes in the `classes` table
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
