CREATE DATABASE IF NOT EXISTS taskflow
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

USE taskflow;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  display_name VARCHAR(100) NULL,
  avatar_url VARCHAR(512) NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  email_verified_at DATETIME NULL,
  failed_login_attempts INT UNSIGNED NOT NULL DEFAULT 0,
  locked_until DATETIME NULL,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS roles (
  id TINYINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_name (name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS user_roles (
  user_id BIGINT UNSIGNED NOT NULL,
  role_id TINYINT UNSIGNED NOT NULL,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT fk_user_roles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_user_roles_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  session_token_hash CHAR(64) NOT NULL,
  user_agent VARCHAR(512) NULL,
  ip_address VARCHAR(45) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME NULL,
  PRIMARY KEY (id),
  UNIQUE KEY uq_sessions_token (session_token_hash),
  KEY idx_sessions_user (user_id),
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT IGNORE INTO roles (id, name) VALUES (1, 'user'), (2, 'admin');
-- ==========================
-- Bloc 1 (users 1 à 50)
-- ==========================
INSERT INTO users (email, password_hash) VALUES
('user1@fakedomain.com', 'password1'),
('user2@fakedomain.com', 'password2'),
('user3@fakedomain.com', 'password3'),
('user4@fakedomain.com', 'password4'),
('user5@fakedomain.com', 'password5'),
('user6@fakedomain.com', 'password6'),
('user7@fakedomain.com', 'password7'),
('user8@fakedomain.com', 'password8'),
('user9@fakedomain.com', 'password9'),
('user10@fakedomain.com', 'password10'),
('user11@fakedomain.com', 'password11'),
('user12@fakedomain.com', 'password12'),
('user13@fakedomain.com', 'password13'),
('user14@fakedomain.com', 'password14'),
('user15@fakedomain.com', 'password15'),
('user16@fakedomain.com', 'password16'),
('user17@fakedomain.com', 'password17'),
('user18@fakedomain.com', 'password18'),
('user19@fakedomain.com', 'password19'),
('user20@fakedomain.com', 'password20'),
('user21@fakedomain.com', 'password21'),
('user22@fakedomain.com', 'password22'),
('user23@fakedomain.com', 'password23'),
('user24@fakedomain.com', 'password24'),
('user25@fakedomain.com', 'password25'),
('user26@fakedomain.com', 'password26'),
('user27@fakedomain.com', 'password27'),
('user28@fakedomain.com', 'password28'),
('user29@fakedomain.com', 'password29'),
('user30@fakedomain.com', 'password30'),
('user31@fakedomain.com', 'password31'),
('user32@fakedomain.com', 'password32'),
('user33@fakedomain.com', 'password33'),
('user34@fakedomain.com', 'password34'),
('user35@fakedomain.com', 'password35'),
('user36@fakedomain.com', 'password36'),
('user37@fakedomain.com', 'password37'),
('user38@fakedomain.com', 'password38'),
('user39@fakedomain.com', 'password39'),
('user40@fakedomain.com', 'password40'),
('user41@fakedomain.com', 'password41'),
('user42@fakedomain.com', 'password42'),
('user43@fakedomain.com', 'password43'),
('user44@fakedomain.com', 'password44'),
('user45@fakedomain.com', 'password45'),
('user46@fakedomain.com', 'password46'),
('user47@fakedomain.com', 'password47'),
('user48@fakedomain.com', 'password48'),
('user49@fakedomain.com', 'password49'),
('user50@fakedomain.com', 'password50');

-- ==========================
-- Bloc 2 (users 51 à 100)
-- ==========================
INSERT INTO users (email, password_hash) VALUES
('user51@fakedomain.com', 'password51'),
('user52@fakedomain.com', 'password52'),
('user53@fakedomain.com', 'password53'),
('user54@fakedomain.com', 'password54'),
('user55@fakedomain.com', 'password55'),
('user56@fakedomain.com', 'password56'),
('user57@fakedomain.com', 'password57'),
('user58@fakedomain.com', 'password58'),
('user59@fakedomain.com', 'password59'),
('user60@fakedomain.com', 'password60'),
('user61@fakedomain.com', 'password61'),
('user62@fakedomain.com', 'password62'),
('user63@fakedomain.com', 'password63'),
('user64@fakedomain.com', 'password64'),
('user65@fakedomain.com', 'password65'),
('user66@fakedomain.com', 'password66'),
('user67@fakedomain.com', 'password67'),
('user68@fakedomain.com', 'password68'),
('user69@fakedomain.com', 'password69'),
('user70@fakedomain.com', 'password70'),
('user71@fakedomain.com', 'password71'),
('user72@fakedomain.com', 'password72'),
('user73@fakedomain.com', 'password73'),
('user74@fakedomain.com', 'password74'),
('user75@fakedomain.com', 'password75'),
('user76@fakedomain.com', 'password76'),
('user77@fakedomain.com', 'password77'),
('user78@fakedomain.com', 'password78'),
('user79@fakedomain.com', 'password79'),
('user80@fakedomain.com', 'password80'),
('user81@fakedomain.com', 'password81'),
('user82@fakedomain.com', 'password82'),
('user83@fakedomain.com', 'password83'),
('user84@fakedomain.com', 'password84'),
('user85@fakedomain.com', 'password85'),
('user86@fakedomain.com', 'password86'),
('user87@fakedomain.com', 'password87'),
('user88@fakedomain.com', 'password88'),
('user89@fakedomain.com', 'password89'),
('user90@fakedomain.com', 'password90'),
('user91@fakedomain.com', 'password91'),
('user92@fakedomain.com', 'password92'),
('user93@fakedomain.com', 'password93'),
('user94@fakedomain.com', 'password94'),
('user95@fakedomain.com', 'password95'),
('user96@fakedomain.com', 'password96'),
('user97@fakedomain.com', 'password97'),
('user98@fakedomain.com', 'password98'),
('user99@fakedomain.com', 'password99'),
('user100@fakedomain.com', 'password100');
