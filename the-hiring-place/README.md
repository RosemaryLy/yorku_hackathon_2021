### Links from the UX design team - 
First prototype is for grad: https://www.figma.com/proto/FebJoSmvq6f2p9OJTgvHHz/Developer-Wireframes?page-id=273[…]in-zoom&starting-point-node-id=273%3A6888&show-proto-sidebar=1

Second prototype is for the recruiter: https://www.figma.com/proto/FebJoSmvq6f2p9OJTgvHHz/Developer-Wireframes?page-id=273[…]2C48%2C0.03&scaling=min-zoom&starting-point-node-id=273%3A4898

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

If there are difficulties opening the app with a react-scripts error try -
### `npm install react-scripts`

If there are difficulties with missing bootstrap files try - 

### `npm install bootstrap` 

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### Database scripts

CREATE DATABASE IF NOT EXISTS York_hiring_place;

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

CREATE TABLE IF NOT EXISTS title (
     title_id INT NOT NULL AUTO_INCREMENT,
     recruiter TINYINT,
     grad TINYINT,
     PRIMARY KEY (title_id)
     );

INSERT INTO recruiter_signup (title_id, password)
     VALUES (2, password),
     (3, password),
     (6, password);

CREATE TABLE IF NOT EXISTS grad_signup (
     grad_id INT NOT NULL AUTO_INCREMENT,
     title_id INT NOT NULL,
     password VARCHAR(50) NOT NULL,
     email VARCHAR(100) NOT NULL,
     PRIMARY KEY (grad_id),
     FOREIGN KEY (title_id) REFERENCES title (title_id)
     );

INSERT INTO grad_signup (title_id, password, email)
    VALUES (1, password, gradA@yoh.net),
    (4, password, gradB@yoh.net),
    (5, password, gradC@yoh.net);

CREATE TABLE IF NOT EXISTS recruiter_signup (
     recruiter_id INT NOT NULL AUTO_INCREMENT,
     title_id INT NOT NULL,
     password VARCHAR(100) NOT NULL,
     email VARCHAR(100) NOT NULL,
     PRIMARY KEY (recruiter_id),
     FOREIGN KEY (title_id) REFERENCES title (title_id)
     );

INSERT INTO recruiter_signup (title_id, password)
     VALUES (2, password),
     (3, password),
     (6, password);

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


CREATE TABLE IF NOT EXISTS recruiter_settings (
     recruiter_settings_id INT NOT NULL AUTO_INCREMENT,
     recruiter_id INT NOT NULL,
     email VARCHAR(100) NOT NULL,
     password VARCHAR(50) NOT NULL,
     PRIMARY KEY (recruiter_settings_id),
     FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id)
     );
INSERT INTO recruiter_settings (recruiter_id, email, password)
VALUES 
    (1, ‘recruiterA@hiring.net’, ‘password’),
    (2, ‘recruiterB@hiring.net’, ‘password’),
    (3, ‘recruiterC@hiring.net’, ‘password’);

CREATE TABLE IF NOT EXISTS grad_settings (
         gradsettings_id INT NOT NULL AUTO_INCREMENT,
         grad_id INT NOT NULL,
         email VARCHAR(100) NOT NULL,
         password VARCHAR(50) NOT NULL,
         PRIMARY KEY (gradsettings_id),
         FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
     );

INSERT INTO grad_settings (grad_id, email, password)
VALUES 
    (1, ‘gradA@hiring.net’, ‘password’),
    (2, ‘gradB@hiring.net’, ‘password’),
    (3, ‘gradC@hiring.net’, ‘password’);

CREATE TABLE IF NOT EXISTS company (
    company_id INT NOT NULL AUTO_INCREMENT,
    company VARCHAR(255) NOT NULL,
    PRIMARY KEY (company_id)
    );

INSERT INTO company (company_id, company)
VALUES 
    (1, ‘Company C’),
    (2, ‘Company A’),
    (3, ‘Company B’);

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

CREATE TABLE IF NOT EXISTS program (
     program_id INT NOT NULL AUTO_INCREMENT,
     program VARCHAR(100) NOT NULL,
     PRIMARY KEY (program_id)
     );

INSERT INTO program (program)
     VALUES ('Web Development'),
     ('UX Designer'),
     ('Computer Science');

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

INSERT INTO grad_profile (grad_id, name, program_id, graduating year)
VALUES 
    (1, ‘Grad A’, 1, 2021),
    (2, ‘Grad B’, 2, 2020),
    (3, ‘Grad C’, 1, 2022);

CREATE TABLE IF NOT EXISTS links (
     links_id INT NOT NULL AUTO_INCREMENT,
     grad_id INT NOT NULL,
     linkedIn VARCHAR(100),
     website_or_portfolio VARCHAR(100),
     twitter VARCHAR(100),
     PRIMARY KEY (links_id),
     FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
     );

INSERT INTO links (grad_id, linkedIn, website_or_portfolio, twitter, instagram) VALUES
    (1, 'gradA@linkedin.com', 'gradA@gradA.ca', '@grada', 'gradA@instagram'),
    (2, 'gradB@linkedin.com', 'gradB@gradA.ca', '@gradb', 'gradB@instagram'),
    (3, 'gradC@linkedin.com', 'gradC@gradA.ca', '@gradc', 'gradC@instagram');

CREATE TABLE IF NOT EXISTS about (
    about_id INT NOT NULL AUTO_INCREMENT,
    grad_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (about_id),
    FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
        );

INSERT INTO about (grad_id, description) VALUES
     (1, 'red'),
     (2, 'blue'),
     (3, 'yellow');


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

INSERT INTO interests (grad_id, accomplishment, superpower, hobbies) VALUES
     (1, 'ad lorem', 'ad lorem', 'ad lorem'),
     (2, 'ad lorem', 'ad lorem', 'ad lorem'),
     (3, 'ad lorem', 'ad lorem', 'ad lorem');

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

CREATE TABLE IF NOT EXISTS important_for_role (
    important_for_role_id INT NOT NULL AUTO_INCREMENT,
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
     VALUES 
    (1, 1, 1, 1, 1, 1, 1),
    (2, 1, 1, 1, 1, 1, 1),
    (3, 1, 1, 1, 1, 1, 1);

CREATE TABLE IF NOT EXISTS languages (
     language_id INT NOT NULL AUTO_INCREMENT,
     grad_id INT NOT NULL,
     english TINYINT,
     french TINYINT,
     PRIMARY KEY (language_id),
     FOREIGN KEY (grad_id) REFERENCES grad_signup (grad_id)
          );

INSERT INTO languages (grad_id, english, french)
     VALUES 
     (1, 1, 1),
     (2, 1, 1),
     (3, 1, 1);

CREATE TABLE IF NOT EXISTS search (
     search_id INT NOT NULL AUTO_INCREMENT,
     recruiter_id INT NOT NULL,
     PRIMARY KEY (search_id),
     FOREIGN KEY (recruiter_id) REFERENCES recruiter_signup (recruiter_id)
     );

CREATE TABLE IF NOT EXISTS search_results (
     search_results_id INT NOT NULL AUTO_INCREMENT,
     recruiter_id INT NOT NULL,
     PRIMARY KEY (search_results_id),
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



