-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 11, 2024 at 10:57 PM
-- Server version: 5.7.30
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `322`
--

-- --------------------------------------------------------

--
-- Table structure for table `town`
--

CREATE TABLE `town` (
  `engname` varchar(30) NOT NULL,
  `lon` float NOT NULL,
  `lat` float NOT NULL,
  `name` varchar(30) NOT NULL,
  `id` int(11) NOT NULL,
  `info` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `town`
--

INSERT INTO `town` (`engname`, `lon`, `lat`, `name`, `id`, `info`) VALUES
('Hamilton', 175.279, -37.787, 'Kirikiriroa', 1, 'An inland city in the North Island of New Zealand. Located on the banks of the Waikato River.'),
('Auckland', 174.763, -36.8485, 'Tāmaki Makaurau ', 2, 'The most populous city of New Zealand and the fifth largest city in Oceania.'),
('Dunedin', 170.503, -45.8788, 'Ōtepoti', 3, 'Situated at the head of Otago Harbour on the South East coast of the South Island.'),
('Christchurch', 172.638, -43.5308, 'Ōtautahi', 4, 'The largest city in the South Island of New Zealand and the seat of the Canterbury Region'),
('Tauranga', 176.165, -37.6878, 'Tauranga Moana', 5, 'A harbourside city in the Bay of Plenty region on the North Island.'),
('Wellington', 174.777, -41.2888, 'Te Whanganui-a-Tara ', 6, 'The capital of New Zealand, sits near the southernmost point of the North Island on the Cook Strait'),
('Invercargill', 168.354, -46.4132, 'Waihōpai', 7, 'A city near the southern tip of the South Island of New Zealand'),
('New Plymouth', 174.075, -39.0556, 'Ngāmotu', 8, 'A city on the west coast of the North Island of New Zealand');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `town`
--
ALTER TABLE `town`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `town`
--
ALTER TABLE `town`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
