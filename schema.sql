CREATE DATABASE paste_app;
USE paste_app;

CREATE TABLE pastes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    urlid TEXT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO pastes (title, content, urlid)
VALUES
("Example paste one", "Lorem ipsum dolor isut damet", "oAetRjpqN"),
("Second example paste", "Hello world,d blah blah blahs jasjkdhsdjfkh", "AzBnYdrWAB");