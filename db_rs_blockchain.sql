-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1,	'2014_10_12_000000_create_users_table',	1),
(2,	'2014_10_12_100000_create_password_resets_table',	1),
(3,	'2019_08_19_000000_create_failed_jobs_table',	1),
(4,	'2019_12_14_000001_create_personal_access_tokens_table',	1),
(5,	'2023_08_01_062524_create_roles_table',	2),
(6,	'2023_08_01_063102_create_role_user_table',	3),
(7,	'2023_08_01_063918_add_blockchain_address_to_users',	4);

DROP TABLE IF EXISTS `pasiens`;
CREATE TABLE `pasiens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `no_identity` varchar(18) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `gender` enum('M','F') NOT NULL,
  `blood_type` char(3) NOT NULL,
  `birthday` date NOT NULL,
  `hidup` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `pasiens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `pasiens` (`id`, `user_id`, `no_identity`, `name`, `address`, `gender`, `blood_type`, `birthday`, `hidup`, `created_at`, `updated_at`) VALUES
(1,	82,	'3202031905010002',	'Patient 1',	'Surabaya',	'M',	'A',	'2001-05-19',	1,	'2023-08-02 18:45:51',	'2023-08-02 18:45:51'),
(2,	83,	'3502071905020001',	'Coba',	'-',	'M',	'O',	'2002-05-19',	1,	'2023-08-02 18:56:03',	'2023-08-02 18:56:03');

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1,	'admin',	'2023-07-31 23:27:07',	'2023-07-31 23:27:07'),
(2,	'doctor',	'2023-07-31 23:27:07',	'2023-07-31 23:27:07'),
(3,	'nurse',	'2023-07-31 23:27:07',	'2023-07-31 23:27:07'),
(4,	'patient',	'2023-07-31 23:27:07',	'2023-07-31 23:27:07'),
(5,	'gizi',	NULL,	NULL),
(6,	'laboran',	NULL,	NULL),
(7,	'farmasi',	NULL,	NULL);

DROP TABLE IF EXISTS `role_user`;
CREATE TABLE `role_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_user_user_id_foreign` (`user_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `role_user` (`id`, `user_id`, `role_id`, `created_at`, `updated_at`) VALUES
(10,	70,	2,	NULL,	NULL),
(21,	82,	4,	'2023-08-02 18:45:51',	'2023-08-02 18:45:51'),
(22,	83,	4,	'2023-08-02 18:56:03',	'2023-08-02 18:56:03'),
(24,	84,	5,	'2023-08-05 00:44:04',	'2023-08-05 00:44:04'),
(25,	86,	6,	'2023-08-05 00:44:41',	'2023-08-05 00:44:41'),
(38,	89,	2,	'2023-08-05 01:34:23',	'2023-08-05 01:34:23'),
(40,	1,	1,	'2023-08-05 01:34:59',	'2023-08-05 01:34:59'),
(41,	72,	3,	'2023-08-05 01:35:28',	'2023-08-05 01:35:28'),
(42,	87,	7,	'2023-08-05 02:34:22',	'2023-08-05 02:34:22');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `blockchain_address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `flag` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_blockchain_address_unique` (`blockchain_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `blockchain_address`, `flag`) VALUES
(1,	'Administrator',	'admin@mail.com',	NULL,	'$2a$12$SxMaCbWsVPjFWiue1X9xcO6OvjOFdhZofFsowwEtF/3kd8SfpKogy',	NULL,	'2023-07-31 23:14:55',	'2023-08-05 01:34:59',	'0x6F5F8ca2C886E58ee200789DA885Dbb37f5FBaD0',	1),
(70,	'doctor70',	'dokter@mail.com',	NULL,	'$2y$10$oUcHXMgrN3ZZqGv4ByKm2O9sSAdQSlbldg.dWR5ATpkpX7M8CNWMG',	NULL,	'2023-08-02 02:57:00',	'2023-08-02 03:00:53',	'0x624c0C07d5415d1508E77082D7d8B91492A597a1',	0),
(72,	'Perawat',	'perawat@mail.com',	NULL,	'$2y$10$oUcHXMgrN3ZZqGv4ByKm2O9sSAdQSlbldg.dWR5ATpkpX7M8CNWMG',	NULL,	'2023-08-02 03:04:10',	'2023-08-05 01:35:28',	'0x0174Ed8fE1Bd619baCEA7e371d98A2BCe29798f5',	1),
(82,	'Patient 1',	'pasien@mail.com',	NULL,	'$2y$10$oUcHXMgrN3ZZqGv4ByKm2O9sSAdQSlbldg.dWR5ATpkpX7M8CNWMG',	NULL,	'2023-08-02 18:45:51',	'2023-08-02 18:45:51',	NULL,	1),
(83,	'Coba',	'rs@mail.com',	NULL,	'$2a$12$iwm2hO13p27CARQJASOpYOhM5SMImhPYdNp6z7gEQ4nnvIPfCJ3PO',	NULL,	'2023-08-02 18:56:03',	'2023-08-02 18:56:03',	NULL,	1),
(84,	'gizi',	'gizi@mail.com',	NULL,	'$2a$12$zXcnlcEsZMeVBPmkOWTzuOhKtjreMDJ5LnZBxEWNdumESDoTA3Bw6',	NULL,	'2023-08-05 00:44:04',	'2023-08-05 00:44:04',	'0x93B7ccdFE623f13781C11b9CbE7f02CAc4A217A4',	1),
(86,	'laboran',	'laboran@mail.com',	NULL,	'$2a$12$cycHxsuH.8mpa8zPMgM82.BT1ohjttlIq2eQpo8E48ZXjU7CmfC5y',	NULL,	'2023-08-05 00:44:41',	'2023-08-05 00:44:41',	'0xDbf95b9092B22D118eCC3963dd118aBeb191cA24',	1),
(87,	'farmasi',	'farmasi@mail.com',	NULL,	'$2a$12$rMx0oN99FGSCBiBnjcAg3e14g6cp5Q18pKOLg79avUTJO5yTTXEla',	NULL,	'2023-08-05 00:45:13',	'2023-08-05 00:45:13',	'0xB9700B051525555e7595235388C696aB8F6A8262',	1),
(89,	'Dokter #2',	'dokter2@mail.com',	NULL,	'$2a$12$P9eIdR6DApsMcukGMtclFuPyManMqPPX7D5OQq79bwSqu58vXjB4y',	NULL,	'2023-08-05 01:11:41',	'2023-08-05 01:28:06',	'-',	1);

-- 2023-08-05 05:23:05
