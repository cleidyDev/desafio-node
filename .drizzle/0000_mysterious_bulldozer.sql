CREATE TABLE `courses` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`),
	CONSTRAINT `courses_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL DEFAULT (UUID()),
	`name` text NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
