CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Reza','/some/url','Relational databases rule the world');
insert into blogs (author, url, title) values ('Sami','/some/url','Learing Python to be hearo in AI');