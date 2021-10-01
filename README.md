### From the UX Design Team

First prototype is for grad: https://www.figma.com/proto/FebJoSmvq6f2p9OJTgvHHz/Developer-Wireframes?page-id=273[…]in-zoom&starting-point-node-id=273%3A6888&show-proto-sidebar=1

Second prototype is for the recruiter: https://www.figma.com/proto/FebJoSmvq6f2p9OJTgvHHz/Developer-Wireframes?page-id=273[…]2C48%2C0.03&scaling=min-zoom&starting-point-node-id=273%3A4898

# yorku_hackathon_2021

1. Create an _.env_ file in app-express-backend root folder. Add the following variables:<br/>

    > ENV_PORT=4000<br/>
    > :hammer_and_wrench: ACCESS_JWT_SECRET=**your secret key**<br/>
    > :hammer_and_wrench: REFRESH_JWT_SECRET=**your secret key**<br/>
    > JWT_EXPIRES_IN=30m<br/>
    > JWT_COOKIE_EXPIRES=90<br/>
    > DB_HOST= "db"<br/>
    > :hammer_and_wrench: DATABASE_USER= **your MYSQL database user name**<br/>
    > :hammer_and_wrench: DATABASE_PASS= **your MySQL database user password**<br/>
    > DATABASE_NAME= "my_profile_app"<br/>

    - :small_red_triangle_down: Note - make sure to setup all fields highlighted with :hammer_and_wrench: above, if you decide to change the port choose any port above 3000

2.  Navigate to the _the-hiring-place-backend_ directory.<br/>

4.  Run the following command to install dependencies:<br/>

    > npm install

5. To start app run:<br/>

    > npm start.

### If npm doesn't start, try
    npm install react-scripts

### and/or

    npm install bootstrap

### DATABASE

CREATE DATABASE IF NOT EXISTS yoh_hiring_place;

USE yoh_hiring_place;

CREATE TABLE IF NOT EXISTS homepage_contact (
         inquiries_id INT NOT NULL AUTO_INCREMENT,
         name VARCHAR(100),
         email VARCHAR(100),
         message VARCHAR(255),
         PRIMARY KEY (inquiries_id)
               );

INSERT INTO homepage_contact (name, email, message)
          VALUES ('Inquirer A', 'inquirera@help.ca', 'ab lorem ipso'),
          ('Inquirer B', 'inquirerb@help.ca', 'ab lorem ipso'),
          ('Inquirer C', 'inquirerc@help.ca', 'ab lorem ipso');

SELECT * FROM homepage_contact;

CREATE TABLE IF NOT EXISTS title (
          title_id INT NOT NULL AUTO_INCREMENT,
          recruiter TINYINT,
          grad TINYINT,
          PRIMARY KEY (title_id)
          );

INSERT INTO title (recruiter, grad)
     VALUES (0, 1),
     (1, 0),
     (1, 0),
     (0, 1),
     (0,1),
     (1,0);

SELECT * FROM title;

CREATE TABLE IF NOT EXISTS grad_signup (
          grad_id INT NOT NULL AUTO_INCREMENT,
          title_id INT NOT NULL,
          password VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL,
          PRIMARY KEY (grad_id),
          FOREIGN KEY (title_id) REFERENCES title (title_id)
          );

INSERT INTO grad_signup (title_id, password, email)
         VALUES (1, ‘password’, ‘gradA@yoh.net’),
     (4, ‘password’, ‘gradB@yoh.net’),
     (5, ‘password’, ‘gradC@yoh.net’);

SELECT * FROM grad_signup;

CREATE TABLE IF NOT EXISTS recruiter_signup (
          recruiter_id INT NOT NULL AUTO_INCREMENT,
          title_id INT NOT NULL,
          password VARCHAR(100) NOT NULL,
          email VARCHAR(100) NOT NULL,
          PRIMARY KEY (recruiter_id),
          FOREIGN KEY (title_id) REFERENCES title (title_id)
          );

INSERT INTO recruiter_signup (title_id, password)
          VALUES (2, ‘password’),
          (3, ‘password’),
          (6, ‘password’);

SELECT * FROM recruiter_signup;

CREATE TABLE IF NOT EXISTS recruiter_login (
          recruiter_login_id INT NOT NULL AUTO_INCREMENT,
          recruiter_id INT NOT NULL,
          password VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL,
          PRIMARY KEY (recruiter_login_id),
          FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id)
          );

INSERT INTO recruiter_login (recruiter_id, password, email)
          VALUES (1, 'password', 'recruiterA@hiring.net'),
          (2, 'password', 'recruiterB@hiring.net'),
          (3, 'password', 'recruiterC@hiring.net');

SELECT * FROM recruiter_login;

CREATE TABLE IF NOT EXISTS grad_login (
          grad_login_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          password VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL,
          PRIMARY KEY (grad_login_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
          );

INSERT INTO grad_login (grad_id, password, email)
          VALUES (1, 'password', 'gradA@hiring.net'),
          (2, 'password', 'gradB@hiring.net'),
          (3, 'password', 'gradB@hiring.net');

SELECT * FROM grad_login;

CREATE TABLE IF NOT EXISTS recruiter_settings (
          recruiter_settings_id INT NOT NULL AUTO_INCREMENT,
          recruiter_id INT NOT NULL,
          email VARCHAR(100) NOT NULL,
          password VARCHAR(50) NOT NULL,
          PRIMARY KEY (recruiter_settings_id),
          FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id)
          );

INSERT INTO recruiter_settings (recruiter_id, email, password)
     VALUES (1, ‘recruiterA@hiring.net’, ‘password’),
     (2, ‘recruiterB@hiring.net’, ‘password’),
     (3, ‘recruiterC@hiring.net’, ‘password’);
Query OK, 3 rows affected (0.106 sec)
Records: 3  Duplicates: 0  Warnings: 0

SELECT * FROM recruiter_settings;

CREATE TABLE IF NOT EXISTS grad_settings (
              gradsettings_id INT NOT NULL AUTO_INCREMENT,
              grad_id INT NOT NULL,
              email VARCHAR(100) NOT NULL,
              password VARCHAR(50) NOT NULL,
              PRIMARY KEY (gradsettings_id),
              FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
          );

INSERT INTO grad_settings (grad_id, email, password)
     VALUES (1, ‘gradA@hiring.net’, ‘password’),
     (2, ‘gradB@hiring.net’, ‘password’),
     (3, ‘gradC@hiring.net’, ‘password’);

SELECT * FROM grad_settings;

CREATE TABLE IF NOT EXISTS company (
     company_id INT NOT NULL AUTO_INCREMENT,
     company VARCHAR(255) NOT NULL,
     PRIMARY KEY (company_id)
         );

INSERT INTO company (company_id, company)
     VALUES (1, ‘Company C’),
     (2, ‘Company A’),
     (3, ‘Company B’);

SELECT * FROM company;

CREATE TABLE IF NOT EXISTS recruiter_profile (
         recruiter_profile_id INT NOT NULL AUTO_INCREMENT,
         recruiter_id INT NOT NULL,
         name VARCHAR(100) NOT NULL,
         image VARCHAR(255) NOT NULL,
         pronouns VARCHAR(100) NOT NULL,
         company_id INT NOT NULL,
         PRIMARY KEY (recruiter_profile_id),
         FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id)
         );

INSERT INTO recruiter_profile (recruiter_id, name, company_id)
          VALUES (1, ‘Recruiter A’, 1),
          (2, ‘Recruiter B’, 2),
          (3, ‘Recruiter C’, 1);

SELECT * FROM recruiter_profile;

CREATE TABLE IF NOT EXISTS education (
               education_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               start_date DATE NOT NULL,
               end_date DATE NOT NULL,
               PRIMARY KEY (education_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO education (grad_id, start_date, end_date) VALUES
          (1, 2020, 2021),
          (2, 2021, 2022),
          (3, 2019, 2020);

SELECT * FROM education;

CREATE TABLE IF NOT EXISTS notification
            (
         notification_id INT NOT NULL AUTO_INCREMENT,
               recruiter_id INT,
               grad_id INT,
              created_at TIMESTAMP DEFAULT NOW(),
               PRIMARY KEY (notification_id),
              FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id),
             FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
              );

INSERT INTO notification (recruiter_id, grad_id)
         VALUES
          (1, 3),
          (2, 2),
          (3, 1);

SELECT * FROM notification;

CREATE TABLE IF NOT EXISTS program (
          program_id INT NOT NULL AUTO_INCREMENT,
          program VARCHAR(100) NOT NULL,
          PRIMARY KEY (program_id)
          );

INSERT INTO program (program)
          VALUES ('Web Development'),
          ('UX Designer'),
          ('Computer Science');

SELECT * FROM program;

CREATE TABLE IF NOT EXISTS grad_profile (
          grad_profile_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          name VARCHAR(100) NOT NULL,
          `image` VARCHAR(255) NOT NULL,
          pronouns VARCHAR(100),
          program_id INT NOT NULL,
          graduating_year INT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          PRIMARY KEY (grad_profile_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
          );

INSERT INTO grad_profile (grad_id, name, program_id, graduating_year)
     VALUES (1, ‘Grad A’, 1, 2021),
     (2, ‘Grad B’, 2, 2020),
     (3, ‘Grad C’, 1, 2022);

SELECT * FROM grad_profile;

CREATE TABLE IF NOT EXISTS links (
          links_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          linkedIn VARCHAR(100),
          website_or_portfolio VARCHAR(100),
          twitter VARCHAR(100),
          instagram VARCHAR(100),
          PRIMARY KEY (links_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
          );

INSERT INTO links (grad_id, linkedIn, website_or_portfolio, twitter, instagram) VALUES
         (1, 'gradA@linkedin.com', 'gradA@gradA.ca', '@grada', 'gradA@instagram'),
         (2, 'gradB@linkedin.com', 'gradB@gradA.ca', '@gradb', 'gradB@instagram'),
         (3, 'gradC@linkedin.com', 'gradC@gradA.ca', '@gradc', 'gradC@instagram');

SELECT * FROM links;

 CREATE TABLE IF NOT EXISTS about (
               about_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               description VARCHAR(255) NOT NULL,
               PRIMARY KEY (about_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

 INSERT INTO about (grad_id, description) VALUES
          (1, 'ad lorem ipso'),
          (2, 'ad lorem ipso'),
          (3, 'ad lorem ipso');

 SELECT * FROM about;

CREATE TABLE IF NOT EXISTS tech_skills (
          tech_skills_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          html TINYINT,
          react TINYINT,
          programming TINYINT,
          skillsD TINYINT,
          skillsE TINYINT,
          skillsF TINYINT,
          skillsG TINYINT,
          skillsH TINYINT,
          add_skill VARCHAR(100),
          PRIMARY KEY (tech_skills_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO tech_skills (grad_id, html, react, programming, skillsD, skillsE, skillsF, skillsG, skillsH, add_skill)
          VALUES
          (1, 1, 1, 1, 0, 0, 0, 0, 0, 'github'),
          (2, 1, 1, 1, 0, 0, 0, 0, 0, 'photoshop'),
          (3, 1, 1, 1, 1, 1, 0, 0, 0, 'javascript');

SELECT * FROM tech_skills;

CREATE TABLE IF NOT EXISTS next_role (
               next_role_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               description VARCHAR(255) NOT NULL,
               PRIMARY KEY (next_role_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO next_role (grad_id, description)
          VALUES (1, 'ad lorem'),
          (2, 'ad lorem'),
          (3, 'ad lorem');

SELECT * FROM next_role;


CREATE TABLE IF NOT EXISTS interests (
         interests_id INT NOT NULL AUTO_INCREMENT,
         grad_id INT NOT NULL,
         accomplishment VARCHAR(255),
         superpower VARCHAR(255),
          hobbies VARCHAR(255),
          PRIMARY KEY (interests_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO interests (grad_id, accomplishment, superpower, hobbies) VALUES
          (1, 'ad lorem', 'ad lorem', 'ad lorem'),
          (2, 'ad lorem', 'ad lorem', 'ad lorem'),
          (3, 'ad lorem', 'ad lorem', 'ad lorem');

SELECT * FROM interests;

CREATE TABLE IF NOT EXISTS remote_work (
               remote_work_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               not_important TINYINT,
               very_important TINYINT,
               PRIMARY KEY (remote_work_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO remote_work (grad_id, not_important, very_important) VALUES
          (1, 0, 1),
          (2, 1, 0),
          (3, 1, 0);

SELECT * FROM remote_work;

CREATE TABLE IF NOT EXISTS markets (
          markets_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          tech TINYINT,
          medicine TINYINT,
          medicine_b TINYINT,
          market_c TINYINT,
          market_d TINYINT,
          market_e TINYINT,
          market_f TINYINT,
          market_g TINYINT,
          add_market VARCHAR(255),
          PRIMARY KEY (markets_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO markets (grad_id, tech, medicine, medicine_b, market_c, market_d, market_e, market_f, market_g, add_market) VALUES
          (1, 1, 0, 0, 1, 1, 0, 0, 0, 'music'),
          (2, 1, 0, 0, 1, 1, 0, 0, 0, 'travel'),
          (3, 1, 0, 0, 1, 1, 0, 0, 0, 'sailing');

SELECT * FROM markets;

CREATE TABLE IF NOT EXISTS personal_skills (
               personal_skills_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               name VARCHAR(100) NOT NULL,
               communication TINYINT,
               collaboration TINYINT,
               problem_solving TINYINT,
               teamwork TINYINT,
               PRIMARY KEY (personal_skills_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO personal_skills (grad_id, communication, collaboration, problem_solving, teamwork)
          VALUES
     (1, 1, 1, 1, 1),
          (2, 1, 1, 1, 1),
          (3, 1, 1, 1, 1);

SELECT * FROM personal_skills;

CREATE TABLE IF NOT EXISTS positions (
          positions_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          internship TINYINT,
          contract TINYINT,
          full_time TINYINT,
          part_time TINYINT,
          PRIMARY KEY (positions_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
          );

INSERT INTO positions (grad_id, internship, contract, full_time, part_time)
          VALUES
          (1, 0, 0, 1, 1),
          (2, 1, 1, 1, 1),
          (3, 0, 0, 1, 0);

SELECT * FROM positions;

CREATE TABLE IF NOT EXISTS size (
               size_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               small TINYINT,
               medium TINYINT,
               large TINYINT,
               very_large TINYINT,
               PRIMARY KEY (size_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO size (grad_id, small, medium, large, very_large)
          VALUES (1, 1, 1, 0, 0),
          (2, 0, 0, 1, 1),
          (3, 0, 1, 1, 0);

SELECT * FROM size;

CREATE TABLE IF NOT EXISTS desired_location (
               desired_location_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               toronto TINYINT,
               mississauga TINYINT,
               calgary TINYINT,
               add_city VARCHAR(100),
               open_to_remote TINYINT,
               PRIMARY KEY (desired_location_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO desired_location (grad_id, toronto, mississauga, calgary, add_city, open_to_remote) VALUES
          (1, 1, 1, 0, 'Kingston', 1),
          (2, 0, 0, 1, 'Vancouver', 2),
          (3, 1, 0, 0, 'Halifax', 3);

SELECT * FROM desired_location;

CREATE TABLE IF NOT EXISTS salary (
               salary_id INT NOT NULL AUTO_INCREMENT,
               grad_id INT NOT NULL,
               salary VARCHAR(100),
               PRIMARY KEY (salary_id),
               FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO salary (grad_id, salary) VALUES
          (1, '$60,000'),
          (2, '$65,000'),
          (3, '$70,000');

SELECT * FROM salary;

CREATE TABLE IF NOT EXISTS important_for_role (
         Important_for_role_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          mentorship TINYINT,
          growth TINYINT,
          challenges TINYINT,
          voice TINYINT,
          ongoing_learning TINYINT,
          growth_company TINYINT,
          PRIMARY KEY (important_for_role_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO important_for_role (grad_id, mentorship, growth, challenges, voice, ongoing_learning, growth_company)
          VALUES (1, 1, 1, 1, 1, 1, 1),
           (2, 1, 1, 1, 1, 1, 1),
           (3, 1, 1, 1, 1, 1, 1);

SELECT * FROM important_for_role;

CREATE TABLE IF NOT EXISTS languages (
          language_id INT NOT NULL AUTO_INCREMENT,
          grad_id INT NOT NULL,
          english TINYINT,
          french TINYINT,
          PRIMARY KEY (language_id),
          FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
               );

INSERT INTO languages (grad_id, english, french)
          VALUES (1, 1, 1),
           (2, 1, 1),
          (3, 1, 1);

SELECT * FROM languages;

CREATE TABLE IF NOT EXISTS search (
          search_id INT NOT NULL AUTO_INCREMENT,
          recruiter_id INT NOT NULL,
          PRIMARY KEY (search_id),
          FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id)
          );

CREATE TABLE IF NOT EXISTS favorites (
          favorites_id INT NOT NULL AUTO_INCREMENT,
          recruiter_id INT NOT NULL,
          PRIMARY KEY (favorites_id),
          FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id)
          );

CREATE TABLE IF NOT EXISTS comments (
          comments_id INT NOT NULL AUTO_INCREMENT,
          favorites_id INT NOT NULL,
          recruiter_id INT NOT NULL,
          PRIMARY KEY (comments_id),
          FOREIGN KEY (favorites_id) REFERENCES favorites (favorites_id)
          );



