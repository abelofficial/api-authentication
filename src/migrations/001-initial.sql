--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE Author (
  id   INTEGER PRIMARY KEY,
  name TEXT    NOT NULL,
  email TEXT    NOT NULL
);

CREATE TABLE Book (
  id          INTEGER PRIMARY KEY,
  categoryId  INTEGER NOT NULL,
  title       TEXT    NOT NULL,
  authorId INTEGER REFERENCES Author(id)
);

INSERT INTO Author (name, email) values ('abel', 'abel@abel.com');
INSERT INTO Author (name, email) values ('john', 'john@john.com');

INSERT INTO Book ( title, categoryId, authorId) values ('Harry Potter', 'sci-fi', 1);
INSERT INTO Book (title, categoryId, authorId) values ('The lord of the ring', 'history', 2);
--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE Author;
DROP TABLE Book;