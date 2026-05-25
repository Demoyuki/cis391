-- CST-391 Milestone 3 — Bible Verse Searcher

CREATE DATABASE IF NOT EXISTS bible_verse_searcher
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bible_verse_searcher;

CREATE TABLE IF NOT EXISTS bible_books (
  book_id       INT          NOT NULL,
  book_name     VARCHAR(50)  NOT NULL,
  testament     VARCHAR(3)   NOT NULL COMMENT 'OT or NT',
  chapter_count INT          NOT NULL,
  PRIMARY KEY (book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS bible_verses (
  id        INT          NOT NULL AUTO_INCREMENT,
  book_id   INT          NOT NULL,
  chapter   INT          NOT NULL,
  verse_num INT          NOT NULL,
  text      VARCHAR(800) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (book_id) REFERENCES bible_books(book_id) ON DELETE CASCADE,
  FULLTEXT KEY ft_verse_text (text)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS verse_notes (
  note_id    INT          NOT NULL AUTO_INCREMENT,
  verse_id   INT          NOT NULL,
  note_text  VARCHAR(800) NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (note_id),
  FOREIGN KEY (verse_id) REFERENCES bible_verses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample data
INSERT IGNORE INTO bible_books VALUES
  (1,'Genesis','OT',50),(19,'Psalms','OT',150),(20,'Proverbs','OT',31),
  (40,'Matthew','NT',28),(43,'John','NT',21),(45,'Romans','NT',16),
  (49,'Ephesians','NT',6),(50,'Philippians','NT',4);

INSERT IGNORE INTO bible_verses (book_id,chapter,verse_num,text) VALUES
  (43,3,16,'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'),
  (43,3,17,'For God did not send his Son into the world to condemn the world, but to save the world through him.'),
  (50,4,13,'I can do all this through him who gives me strength.'),
  (19,23,1,'The LORD is my shepherd, I lack nothing.'),
  (45,8,28,'And we know that in all things God works for the good of those who love him.'),
  (49,2,8,'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.'),
  (20,3,5,'Trust in the LORD with all your heart and lean not on your own understanding.'),
  (40,5,16,'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.'),
  (1,1,1,'In the beginning God created the heavens and the earth.');

INSERT IGNORE INTO verse_notes (verse_id,note_text) VALUES
  (1,'The most famous verse in the Bible — the heart of the Gospel.'),
  (3,'A powerful reminder that strength comes from Christ, not from ourselves.');
