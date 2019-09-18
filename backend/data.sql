DROP DATABASE IF EXISTS "microblog";

CREATE DATABASE "microblog";

\c "microblog"

CREATE TABLE posts (id SERIAL PRIMARY KEY, 
                    title TEXT NOT NULL, 
                    description TEXT NOT NULL,
                    body TEXT, 
                    votes INT NOT NULL DEFAULT 0);
                    
CREATE TABLE comments (id SERIAL PRIMARY KEY, 
                       text TEXT NOT NULL, 
                       post_id INT NOT NULL REFERENCES posts ON DELETE CASCADE);

CREATE TABLE categories (tag TEXT NOT NULL PRIMARY KEY);

CREATE TABLE categories_posts (post_id INT NOT NULL REFERENCES posts ON DELETE CASCADE,
                              tag_id TEXT NOT NULL REFERENCES categories ON DELETE CASCADE,
                              PRIMARY KEY(post_id, tag_id));

INSERT INTO posts (title, description, body) VALUES
    ('First Post', 'Best post ever!', 'Everyone loves posting first. I win!'),
    ('Second Post', 'A very good post!', 'Oh well. Didn''t get to be first.');

INSERT INTO comments (text, post_id) VALUES
    ('This is a really great post.', 1),
    ('I learned so much reading this.', 1);


INSERT INTO categories (tag)  VALUES
    ('science'),
    ('computer science'),
    ('art'),
    ('sport'),
    ('cinema'),
    ('technology'),
    ('fashion'),
    ('medical'),
    ('school'),
    ('law'),
    ('finance'),
    ('food'),
    ('life style'),
    ('photography'),
    ('buisness'),
    ('design'),
    ('education'),
    ('gaming'),
    ('history')
    ;

INSERT INTO categories_posts (post_id, tag_id)  VALUES
    (1, 'science'),
    (1, 'computer science'),
    (2, 'art');