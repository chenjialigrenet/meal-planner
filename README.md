# Meal Planner

## About

### What is it?

This is a meal planner project for household weekly meal planning. I want to eat smarter, reduce time wastes on food shopping and preparation.

### Why I did this?

The most frequently asked question in our family is probably "What should we eat tonight?"
As a member of a mordern double-working family, I should not scrach my head so hard every time I open the fridge door. There are so many things inside, but what to prepare for dinner is still too difficult a question.
Digging out expired dairy products from the bottom of the fridge, throwing away mushy spinach or rotten bell pepers makes me feel guilty.
We deserve fresh and balanced food and ordering delivery can be a huge expense if it becomes a daily routine.
How can I get more organized, optimize grocery shopping and food preparation time while limiting wastes and enjoying more my life without all kinds of hustles ? Here comes this project.

### Technically

It is a web application designed and implemented with Python and Javascript, using Django as server side framework and ReactJS as client side library.
Since I have chosen bootstrap for the styling, this application is also mobile compatible.

## Prerequisites

-   [Python3](https://www.python.org/downloads/)
-   [Django](https://www.djangoproject.com/)
-   [Node.js](https://nodejs.org/en/)
-   [React.js](https://reactjs.org/)

## Dependencies

-   [Django REST Framework](https://www.django-rest-framework.org/)
-   [Django CORS Headers](https://pypi.org/project/django-cors-headers/)
-   [DRF simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
-   [React Router v6](https://reactrouter.com/)
-   [Axios](https://axios-http.com/)
-   [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
-   [React Bootstrap](https://react-bootstrap.netlify.app/)
-   [React Icons](https://react-icons.github.io/react-icons/)
-   [React Select](https://react-select.com/home)
-   [React-select-async-paginate](https://github.com/vtaits/react-select-async-paginate/tree/master/packages/react-select-async-paginate)
-   [Framer-motion](https://www.framer.com/motion/)
-   [Uuid](https://www.npmjs.com/package/uuid)

## Usage

-   Run `python3 manage.py runserver` inside backend folder to launch the server
-   Run `npm start` inside frontend folder to launch the front end
-   If you want to see the result with pre-loaded data, you can log in using this account:
    `alice@email.com`
    `12345678`

## Ports

-   Server side:

```sh
127.0.0.1:8000
```

-   Client side:

```sh
127.0.0.1:3000
```

## Distinctiveness and Complexity

This is a fullstack project using two different programming languages with Django framework (python) on the server side and ReactJS (javascript) on the client side.

-   Backend challenges:

    -   SQLite data modeling, with several many-to-many relations, tricky to handle nested data
    -   First time using Django framework, a bit overwhelmed by the Django REST Framework, CORS Headers and auth using simple JWT
    -   Serializer is a new concept to me who only used MERN stack before (full stack JavaScript)

-   Frontend challanges:
    -   ReactJS with hooks and context API
    -   Authentication setting up and token management/refresh
    -   Image upload front and back(Pillow)
    -   Handle form input using custom hooks (hooksLib.jsx)
    -   Use React Select to dynamically fetch pulldown list data
    -   Pagination
    -   UI/UX design

## To be continued

-   Improve error handling and form validations
-   Complete different scenarios when update recipe
-   Implement text editor for recipe form creation
-   Add unit testing/integration testing
-   Style landing page
-   Use css module to prevent css scope issues

## Some screen shots

Plans list:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/1_planlist.png)
Plan table with meals of a week:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/2_plan_table.png)
Recipes list for inspiration:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/3_recipelist.png)
Recipe preview modal:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/4_recipe_preview_modal.png)
Recipe detail page (can update/delete recipe if logged use is the author):
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/5_recipe_details.png)
Recipe update form:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/6_update_recipe_form.png)
Grocery list:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/7_grocerylist.png)
User account:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/8_user_account.png)
User update:
![alt text](https://github.com/cligrenet/meal-planner/blob/main/screenshots/9_update_user_account.png)
