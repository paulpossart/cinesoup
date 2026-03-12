BEGIN;

CREATE SCHEMA cinesoup;

CREATE TABLE cinesoup.session (
  sid text PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
);

CREATE INDEX "IDX_session_expire" ON cinesoup.session (expire);

CREATE TABLE cinesoup.users(
    id UUID PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX users_username_idx ON cinesoup.users (username);

CREATE TABLE cinesoup.movies (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES cinesoup.users(id) ON DELETE CASCADE,
    movie_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table limits
-- session
CREATE OR REPLACE FUNCTION prevent_excess_cinesoup_sessions()
RETURNS trigger AS $$
BEGIN
    IF (SELECT COUNT(*) FROM cinesoup.session) >= 5000 THEN
        RAISE EXCEPTION 'Session limit reached — cannot create new.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cinesoup_session_limit_trigger
BEFORE INSERT ON cinesoup.session
FOR EACH ROW EXECUTE FUNCTION prevent_excess_cinesoup_sessions();

-- users
CREATE OR REPLACE FUNCTION prevent_excess_cinesoup_users()
RETURNS trigger AS $$
BEGIN
    IF (SELECT COUNT(*) FROM cinesoup.users) >= 1000 THEN
        RAISE EXCEPTION 'User limit reached — cannot create new users.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cinesoup_users_limit_trigger
BEFORE INSERT ON cinesoup.users
FOR EACH ROW EXECUTE FUNCTION prevent_excess_cinesoup_users();

-- movies
CREATE OR REPLACE FUNCTION prevent_excess_cinesoup_movies()
RETURNS trigger AS $$
BEGIN
    IF (SELECT COUNT(*) FROM cinesoup.movies) >= 10000 THEN
        RAISE EXCEPTION 'Movie storage limit reached.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cinesoup_movies_limit_trigger
BEFORE INSERT ON cinesoup.movies
FOR EACH ROW EXECUTE FUNCTION prevent_excess_cinesoup_movies();

COMMIT;