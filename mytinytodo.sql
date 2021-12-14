-- Adminer 4.8.1 MySQL 8.0.27 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `mytinytodo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mytinytodo`;

CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subject` varchar(64) NOT NULL,
  `notes` varchar(64) DEFAULT NULL,
  `priority` int NOT NULL DEFAULT '0',
  `status` varchar(64) NOT NULL DEFAULT 'TODO',
  `tags` varchar(64) DEFAULT NULL,
  `due` varchar(64) DEFAULT NULL,
  `listId` int NOT NULL,
  `createdOn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `updatedOn` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `listId` (`listId`),
  CONSTRAINT `items_ibfk_2` FOREIGN KEY (`listId`) REFERENCES `lists` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `lists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `userId` int NOT NULL,
  `order` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'CREATED',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `lists_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(64) NOT NULL DEFAULT 'myTinyTodo',
  `i18n` varchar(64) NOT NULL DEFAULT 'EN',
  `autoTagging` varchar(64) NOT NULL DEFAULT 'false',
  `timezone` varchar(64) NOT NULL DEFAULT 'UTC',
  `firstDayOfWeek` varchar(64) NOT NULL DEFAULT 'MON',
  `dateFormat` varchar(64) NOT NULL DEFAULT 'L',
  `defaultOrder` varchar(64) NOT NULL DEFAULT 'CREATED',
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `settings_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2021-12-02 21:07:05
