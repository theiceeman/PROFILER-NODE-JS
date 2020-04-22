-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2020 at 01:41 AM
-- Server version: 5.7.9
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `profiler`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_support`
--

DROP TABLE IF EXISTS `admin_support`;
CREATE TABLE IF NOT EXISTS `admin_support` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(200) NOT NULL,
  `user_email` varchar(200) NOT NULL,
  `created_at` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`conversation_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_support`
--

INSERT INTO `admin_support` (`id`, `conversation_id`, `user_email`, `created_at`) VALUES
(3, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'Sat, 07 Mar 2020 11:02:27 am'),
(6, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'Wed, 11 Mar 2020 11:07:07 am');

-- --------------------------------------------------------

--
-- Table structure for table `admin_support_messages`
--

DROP TABLE IF EXISTS `admin_support_messages`;
CREATE TABLE IF NOT EXISTS `admin_support_messages` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(200) NOT NULL,
  `sender` varchar(200) NOT NULL,
  `reciever` varchar(200) NOT NULL,
  `message` text NOT NULL,
  `read_status` varchar(200) NOT NULL,
  `date_sent` varchar(200) NOT NULL,
  `message_uniq_id` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`message_uniq_id`)
) ENGINE=MyISAM AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_support_messages`
--

INSERT INTO `admin_support_messages` (`id`, `conversation_id`, `sender`, `reciever`, `message`, `read_status`, `date_sent`, `message_uniq_id`) VALUES
(1, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'admin', 'heyy', 'read', 'Sat, 07 Mar 2020 21:42:09 pm', 'ADMINSUPPORTMSGTVC672715983RPC348185027'),
(2, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'tester2@gmail.com', 'i need help', 'read', 'Sat, 07 Mar 2020 21:47:29 pm', 'ADMINSUPPORTMSGRPR435195577RPY677093670'),
(3, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'admin', 'Hello profiler.... am jack i need help setting up my gigs', 'read', 'Wed, 11 Mar 2020 11:07:50 am', 'ADMINSUPPORTMSGRDA651915255RJC436599850'),
(4, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'tester2@gmail.com', 'jack@gmail.com', ' heyy\n                                                                        ', 'read', 'Wed, 11 Mar 2020 15:42:59 pm', 'ADMINSUPPORTMSGRET346910393RDE873408526'),
(5, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'tester2@gmail.com', 'jack@gmail.com', 'hy jack whatsup', 'read', 'Fri, 13 Mar 2020 14:38:03 pm', 'ADMINSUPPORTMSGRDE877573432RHC908525220'),
(6, 'ADMINSUPPORTCHATRPK4585053931583578947640 ', 'tester2@gmail.com ', 'tester1@gmail.com ', 'heyy tester1 .... how re you??', 'read', 'Fri, 13 Mar 2020 17:37:17 pm', 'ADMINSUPPORTMSGREN453579361RPF871939781'),
(7, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'tester2@gmail.com', 'jack@gmail.com', 'what problem are you having sir??', 'read', 'Fri, 13 Mar 2020 17:44:24 pm', 'ADMINSUPPORTMSGTTT454608302RKC671955254'),
(8, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'admin', 'i cant login to my acct. since wednesday', 'read', 'Fri, 13 Mar 2020 18:00:22 pm', 'ADMINSUPPORTMSGRPP678953407REE787209578'),
(9, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'admin', 'what do i do please??', 'read', 'Fri, 13 Mar 2020 18:25:04 pm', 'ADMINSUPPORTMSGRPG764237658RDA659959902'),
(13, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'admin', 've been locked out since please??', 'read', 'Fri, 13 Mar 2020 18:32:16 pm', 'ADMINSUPPORTMSGRPC347857005RPH237882483'),
(14, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'tester2@gmail.com', 'jack@gmail.com', 'what is the error message you got sir?', 'read', 'Fri, 13 Mar 2020 18:40:39 pm', 'ADMINSUPPORTMSGRJC431290395REU346532003'),
(15, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'tester2@gmail.com', 'jack@gmail.com', 'we re on your problem now sir', 'read', 'Fri, 13 Mar 2020 18:43:01 pm', 'ADMINSUPPORTMSGRPS765518570TVC678145215'),
(16, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'admin', 'no customer has been able to contact me for a month and now...', 'read', 'Sat, 14 Mar 2020 20:03:33 pm', 'ADMINSUPPORTMSGREY785192878REZ437892561'),
(17, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester2@gmail.com', 'tester1@gmail.com', 'have you registered this complaint with us before sir??', 'read', 'Sat, 14 Mar 2020 20:04:50 pm', 'ADMINSUPPORTMSGRPQ784682026RPN438638215'),
(18, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester2@gmail.com', 'tester1@gmail.com', 'we are waiting on your reply please??', 'read', 'Sat, 14 Mar 2020 20:19:44 pm', 'ADMINSUPPORTMSGTTT451429312RJC436957424'),
(19, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'admin', 'no this is the first time', 'read', 'Sun, 15 Mar 2020 06:59:49 am', 'ADMINSUPPORTMSGTXC348949498REB567000249'),
(20, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester2@gmail.com', 'tester1@gmail.com', 'okay our technical team are on it now.... exercise some patience please sir??', 'read', 'Sun, 15 Mar 2020 07:00:38 am', 'ADMINSUPPORTMSGRBB454683312RDE878491079'),
(21, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester2@gmail.com', 'tester1@gmail.com', 'just in a few mins', 'read', 'Sun, 15 Mar 2020 07:04:28 am', 'ADMINSUPPORTMSGREZ438508583RES451907626'),
(22, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'admin', 'please am under big time pressure right now', 'read', 'Sun, 15 Mar 2020 07:06:46 am', 'ADMINSUPPORTMSGTAH344112114TDO569954448'),
(23, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester2@gmail.com', 'tester1@gmail.com', 'dont worry sir.... wont take time atall', 'read', 'Sun, 15 Mar 2020 07:07:08 am', 'ADMINSUPPORTMSGTTT455261583RGC546631907'),
(25, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'admin', 'okay.... am waiting', 'unread', 'Sun, 15 Mar 2020 07:24:35 am', 'ADMINSUPPORTMSGRPK451949029RDB674667357'),
(27, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'admin', 'please any updates?', 'read', 'Sun, 15 Mar 2020 07:51:25 am', 'ADMINSUPPORTMSGRPM439658544RBH546753437'),
(32, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'admin', 'another', 'unread', 'Sun, 15 Mar 2020 09:02:48 am', 'ADMINSUPPORTMSGRER436831550RPX567495811'),
(33, 'ADMINSUPPORTCHATRPK4585053931583578947640', 'tester1@gmail.com', 'admin', 'still waiting oo', 'unread', 'Sun, 15 Mar 2020 11:07:01 am', 'ADMINSUPPORTMSGTAC788870144RED677362202'),
(34, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'admin', 'it seems this service and platform is not worth my time!!', 'read', 'Mon, 16 Mar 2020 20:03:19 pm', 'ADMINSUPPORTMSGREJ346560334REJ346160127'),
(35, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'tester2@gmail.com', 'jack@gmail.com', 'no no no..... sorry freelancer. we are currently undergoing maintenance. please bear with us', 'read', 'Mon, 16 Mar 2020 20:04:50 pm', 'ADMINSUPPORTMSGRGC548226047REG8582968'),
(36, 'ADMINSUPPORTCHATRPY6746009031583924827107', 'jack@gmail.com', 'admin', 'buh my problem since wednesday ... no solution since then. WTF!!!', 'unread', 'Mon, 16 Mar 2020 20:05:43 pm', 'ADMINSUPPORTMSGTLC342350639TQO657149817');

-- --------------------------------------------------------

--
-- Table structure for table `admin_tb`
--

DROP TABLE IF EXISTS `admin_tb`;
CREATE TABLE IF NOT EXISTS `admin_tb` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `date_created` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_tb`
--

INSERT INTO `admin_tb` (`id`, `email`, `password`, `firstname`, `date_created`) VALUES
(1, 'tester2@gmail.com', '$2a$10$yNGdc3US5YDA4hIdlsGUzu4mB1T2TBhyNiRsLsKVIoCI/zWyrUqw6', 'tester2', '1576512665494'),
(4, 'admin@profiler.com', '$2a$10$q10qi5gUG.rjho86PS7lP.IRlSRgceDZOHUtE3SUW/Tz9z2HBE8J.', 'admin', '1584220567322');

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(100) NOT NULL,
  `first_participant` varchar(100) NOT NULL,
  `second_participant` varchar(200) NOT NULL,
  `created_at` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`unique_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `unique_id`, `first_participant`, `second_participant`, `created_at`) VALUES
(1, 'CHATRES456409788', 'tester1@gmail.com', 'jack@gmail.com', '1581086837462'),
(4, 'CHATRKK454508079', 'tester1@gmail.com', 'tester1@gmail.com', 'Wed, 12 Feb 2020 16:19:31 pm');

-- --------------------------------------------------------

--
-- Table structure for table `gigs`
--

DROP TABLE IF EXISTS `gigs`;
CREATE TABLE IF NOT EXISTS `gigs` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `main_category` varchar(100) NOT NULL,
  `sub_category` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `reviews` varchar(100) NOT NULL DEFAULT '0',
  `blocked` varchar(100) NOT NULL DEFAULT '1',
  `cover_image` varchar(100) DEFAULT 'img-05.png',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`unique_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `gigs`
--

INSERT INTO `gigs` (`id`, `unique_id`, `title`, `main_category`, `sub_category`, `email`, `reviews`, `blocked`, `cover_image`) VALUES
(9, 'GIGRPW785306349', 'I will do minimalist real estate business logo and business card design', 'CATEGORYRWH438725094', 'SUBCATEGORYRDA654060072', 'tester1@gmail.com', '0', '0', 'GigCoverImage-REG81082761584367729875.jpg'),
(10, 'GIGREJ344748821', 'I will setup and configure AWS resources', 'CATEGORYRWH438725094', 'SUBCATEGORYRDA654060072', 'tester1@gmail.com', '0', '1', 'GigCoverImage-RPT3412011171584451639770.jpg'),
(11, 'GIGRPQ783912130', 'I will professionally mix and master your hip hop song in 24 hours ', 'CATEGORYREM541484462', 'SUBCATEGORYTCC345684734', 'jack@gmail.com', '0', '1', 'img-05.png');

-- --------------------------------------------------------

--
-- Table structure for table `main_category`
--

DROP TABLE IF EXISTS `main_category`;
CREATE TABLE IF NOT EXISTS `main_category` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `cover_photo` varchar(100) NOT NULL DEFAULT 'avatar-category.jpg',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`unique_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `main_category`
--

INSERT INTO `main_category` (`id`, `unique_id`, `title`, `description`, `cover_photo`) VALUES
(3, 'CATEGORYRWH438725094', 'Programming & Tech', 'Get all the technical bells and whistles without paying for a programming degree', 'avatar-category.jpg'),
(4, 'CATEGORYREM541484462', 'Lifestyle', 'Improve your quality of life with style', 'CATEGORYCOVER-REJ3436159691583503917047.PNG'),
(5, 'CATEGORYTAZ347499222', 'Graphics & Design', 'A single place, millions of creative talents', 'CATEGORYCOVER-REZ4355424401583570744012.jpg'),
(6, 'CATEGORYRPU457224111', 'Digital Marketing', 'Update and upgrade your business online', 'avatar-category.jpg'),
(7, 'CATEGORYRPD564206326', 'Artisans', 'multi-talented skilled workers easily found', 'CATEGORYCOVER-REC5470264391583571379851.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(200) NOT NULL AUTO_INCREMENT,
  `conversation_id` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `sender` varchar(100) NOT NULL,
  `reciever` varchar(100) NOT NULL,
  `time_created` varchar(100) NOT NULL,
  `unique_id` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`unique_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `conversation_id`, `message`, `sender`, `reciever`, `time_created`, `unique_id`) VALUES
(1, 'CHATRES456409788', 'heyy jack..... whats man??', 'tester1@gmail.com', 'jack@gmail.com', 'Wed, 12 Feb 2020; 14:11:21 pm', 'MSGRPN439877868RPP671586932'),
(2, 'CHATRES456409788', 'am fine oo... kway brother', 'jack@gmail.com', 'tester1@gmail.com', 'Wed, 12 Feb 2020 14:47:58 pm', 'MSGRER439780418REO438275842'),
(3, 'CHATRES456409788', 'jus dey enjoy your sef..', 'jack@gmail.com', 'tester1@gmail.com', 'Wed, 12 Feb 2020 14:50:32 pm', 'MSGRPL909693420REY786056916'),
(4, 'CHATRES456409788', 'nothing ooh... money no even dey sef', 'tester1@gmail.com', 'jack@gmail.com', 'Wed, 12 Feb 2020 15:03:51 pm', 'MSGRJC431907353TNC543905118'),
(5, 'CHATRES456409788', 'ahbi.... na manage we all dey here bro', 'jack@gmail.com', 'tester1@gmail.com', 'Wed, 12 Feb 2020 15:06:03 pm', 'MSGTQO655315792RED673180186'),
(6, 'CHATRES456409788', 'na small small ni', 'jack@gmail.com', 'tester1@gmail.com', 'Wed, 12 Feb 2020 15:06:17 pm', 'MSGTAT675641510TZC543620216'),
(7, 'CHATRES456409788', 'bro... how today go be nh. as per TGIF .... hehehe', 'tester1@gmail.com', 'jack@gmail.com', 'Fri, 21 Feb 2020 16:17:21 pm', 'MSGRPH239222421RPL908993277'),
(8, 'CHATRES456409788', 'Happy sunday bro!', 'tester1@gmail.com', 'jack@gmail.com', 'Sun, 23 Feb 2020 11:10:43 am', 'MSGTAH344704472REM545841403'),
(9, 'CHATRES456409788', 'same here oo brother!!', 'jack@gmail.com', 'tester1@gmail.com', 'Sun, 23 Feb 2020 11:16:25 am', 'MSGTAZ349696157REU349439140'),
(10, 'CHATRES456409788', 'how that side nh :)', 'jack@gmail.com', 'tester1@gmail.com', 'Sun, 23 Feb 2020 11:16:42 am', 'MSGRPQ787152356RER439377976');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `uniqueId` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` text NOT NULL,
  `sender` varchar(100) NOT NULL,
  `reciever` varchar(100) NOT NULL,
  `dateSent` varchar(100) NOT NULL,
  `viewed_by` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`uniqueId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `uniqueId`, `title`, `message`, `sender`, `reciever`, `dateSent`, `viewed_by`) VALUES
(1, '34567', 'welcome message', 'welcome to Profiler, Ebube. Hope our services satisfy you.', 'system', 'tester1@gmail.com', '12/11/20', 'jack@gmail.com,ebube@gmail.com,tester1@gmail.com,tester1@gmail.com,tester1@gmail.com,tester1@gmail.com,tester1@gmail.com'),
(2, 'f311bb68798', 'Definition and Usage', 'The nodes in the collection are sorted as they appear in the source code and can be accessed by index numbers. The index starts at 0.\r\n\r\nNote: Whitespace inside elements is considered as text, and text is considered as nodes. Comments are also considered as nodes.\r\n\r\nTip: You can use the length property of the NodeList object to determine the number of child nodes, then you can loop through all child nodes and extract the info you want.', 'system', 'tester1@gmail.com', '06/12/20', ',tester1@gmail.com,tester1@gmail.com,tester1@gmail.com,tester1@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `previous_projects`
--

DROP TABLE IF EXISTS `previous_projects`;
CREATE TABLE IF NOT EXISTS `previous_projects` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `project_id` varchar(100) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`project_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `previous_projects`
--

INSERT INTO `previous_projects` (`id`, `email`, `project_id`, `title`, `url`) VALUES
(3, 'tester1@gmail.com', 'RPR433897208', 'e commerce site', 'https://en.wikipedia.org/wiki/');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(100) NOT NULL,
  `reviewer_id` varchar(100) NOT NULL,
  `seller_id` varchar(100) NOT NULL,
  `review` text NOT NULL,
  `date_created` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`unique_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `unique_id`, `reviewer_id`, `seller_id`, `review`, `date_created`) VALUES
(1, 'REVIEWRPJ542825008', 'tester1@gmail.com', 'jack@gmail.com', 'nice job man...', '1582301465141');

-- --------------------------------------------------------

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE IF NOT EXISTS `sub_category` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `linked_to` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`unique_id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sub_category`
--

INSERT INTO `sub_category` (`id`, `unique_id`, `title`, `linked_to`) VALUES
(6, 'SUBCATEGORYRDA654060072', 'Mobile Development', 'CATEGORYRWH438725094'),
(5, 'SUBCATEGORYRPG763743737', 'Web Development', 'CATEGORYRWH438725094'),
(7, 'SUBCATEGORYREC547084165', 'Word-Press', 'CATEGORYRWH438725094'),
(8, 'SUBCATEGORYTCC345684734', 'DJ''S', 'CATEGORYREM541484462'),
(9, 'SUBCATEGORYRPD329145985', 'Life Bands', 'CATEGORYREM541484462'),
(10, 'SUBCATEGORYRFC676518918', 'Music Promoters', 'CATEGORYREM541484462'),
(11, 'SUBCATEGORYREN455467351', 'Logo Design', 'CATEGORYTAZ347499222'),
(14, 'SUBCATEGORYTDT673153686', 'SEO', 'CATEGORYRPU457224111'),
(15, 'SUBCATEGORYTZC547844982', 'Bloggers', 'CATEGORYRPU457224111'),
(16, 'SUBCATEGORYREE783627633', 'Social Media Marketing', 'CATEGORYRPU457224111'),
(17, 'SUBCATEGORYREB562954204', 'Plumbers', 'CATEGORYRPD564206326'),
(18, 'SUBCATEGORYTVC673369269', 'Brick Layers', 'CATEGORYRPD564206326'),
(19, 'SUBCATEGORYREE789991414', 'Portraits & Caricatures', 'CATEGORYTAZ347499222'),
(20, 'SUBCATEGORYRED673346951', 'Architecture', 'CATEGORYTAZ347499222');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `state` varchar(100) DEFAULT NULL,
  `sex` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `number` varchar(100) DEFAULT NULL,
  `profile_image` varchar(100) NOT NULL DEFAULT 'avatar.jpg',
  `blocked` varchar(100) NOT NULL DEFAULT '1',
  `date_joined` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `firstName`, `lastName`, `password`, `state`, `sex`, `address`, `number`, `profile_image`, `blocked`, `date_joined`) VALUES
(1, 'tester1@gmail.com', 'Ebube', 'Okorie', '$2a$10$Ewgid5U/i02kXJRn2IkH..Bq5EG/B3IY0X5OpwBrcxfJWHF30BNwW', 'Enugu', 'Female', 'Enugu, Nigeria', '08183175686', 'ProfileImage-RPG7639518961584529439421.jpg', '1', '1576512665494'),
(2, 'jack@gmail.com', NULL, NULL, '$2a$10$Mq/aUDTiO2ueO7MtOPAenOluXMnNPwMvaCJA5a/kCQRWSYSHTq5R2', NULL, NULL, NULL, NULL, 'ProfileImage-TCC3449811121583570578363.jpg', '1', '1580773122780');

-- --------------------------------------------------------

--
-- Table structure for table `user_description`
--

DROP TABLE IF EXISTS `user_description`;
CREATE TABLE IF NOT EXISTS `user_description` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `skills` text,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_description`
--

INSERT INTO `user_description` (`id`, `email`, `skills`, `description`) VALUES
(1, 'tester1@gmail.com', 'Web-Development,Game-development,desktop-app,', 'We are the team for all kind of web related works and also photo editing services. Product photo editing, ClickFunnels, InfusionSoft, WordPress and Landing Page design also.'),
(2, 'jack@gmail.com', NULL, NULL),
(3, 'tester2@gmail.com', NULL, NULL),
(4, 'me@me.com', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
