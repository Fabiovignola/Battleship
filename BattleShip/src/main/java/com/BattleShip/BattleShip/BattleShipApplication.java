package com.BattleShip.BattleShip;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
public class BattleShipApplication {

	public static void main(String[] args) {
		SpringApplication.run(BattleShipApplication.class, args);
	}
		@Bean
		public CommandLineRunner initData(PlayerRepository repository, GameRepository grepository,
										  GamePlayerRepository prepository, ShipRepository srepository) {
			return (args) -> {
				// save a couple of customers
				Player p1 = new Player("j.bauer@ctu.gov");
				Player p2 = new Player("c.obrian@ctu.gov");
				Player p3 = new Player("kim_bauer@gmail.com");
				Player p4 = new Player("t.almeida@ctu.gov");
				repository.save(p1);
				repository.save(p2);
				repository.save(p3);
				repository.save(p4);

				Game g1 = new Game();
				Game g2 = new Game();
				Game g3 = new Game();
				Game g4 = new Game();
				Game g5 = new Game();
				Game g6 = new Game();
				Game g7 = new Game();
				Game g8 = new Game();
				grepository.save(g1);
				grepository.save(g2);
				grepository.save(g3);
				grepository.save(g4);
				grepository.save(g5);
				grepository.save(g6);
				grepository.save(g7);
				grepository.save(g8);

				GamePlayer gp1 = new GamePlayer(p1,g1);
				prepository.save(gp1);
				GamePlayer gp2 = new GamePlayer(p2,g1);
				prepository.save(gp2);
				GamePlayer gp3 = new GamePlayer(p1,g2);
				prepository.save(gp3);
				GamePlayer gp4 = new GamePlayer(p2,g2);
				prepository.save(gp4);
				GamePlayer gp5 = new GamePlayer(p2,g3);
				prepository.save(gp5);
				GamePlayer gp6 = new GamePlayer(p4,g3);
				prepository.save(gp6);
				GamePlayer gp7 = new GamePlayer(p2,g4);
				prepository.save(gp7);
				GamePlayer gp8 = new GamePlayer(p1,g4);
				prepository.save(gp8);
				GamePlayer gp9 = new GamePlayer(p4,g5);
				prepository.save(gp9);
				GamePlayer gp10 = new GamePlayer(p1,g5);
				prepository.save(gp10);
				GamePlayer gp11 = new GamePlayer(p3,g6);
				prepository.save(gp11);
				GamePlayer gp13 = new GamePlayer(p4,g7);
				prepository.save(gp13);
				GamePlayer gp15 = new GamePlayer(p3,g8);
				prepository.save(gp15);
				GamePlayer gp16 = new GamePlayer(p4,g8);
				prepository.save(gp16);

				///POSI 1
				List<String> location1 = Arrays.asList("H2", "H3", "H4");
				Ship s1 = new Ship("Destroyer", gp1, location1);
				srepository.save(s1);
				///POST 2
				List<String> location2 = Arrays.asList("E1", "F1", "G1");
				Ship s2 = new Ship("Submarine", gp1, location2);
				srepository.save(s2);
				///POST 3
				List<String> location3 = Arrays.asList("B4", "B5");
				Ship s3 = new Ship("Patrol", gp1, location3);
				srepository.save(s3);
				///POST 4
				List<String> location4 = Arrays.asList("B5", "C5", "D5");
				Ship s4 = new Ship("Destroyer", gp2, location4);
				srepository.save(s4);
				///POST 5
				List<String> location5 = Arrays.asList("F1", "F2");
				Ship s5 = new Ship("Patrol Boat", gp2, location5);
				srepository.save(s5);
				///POST 6
				List<String> location6 = Arrays.asList("B5", "C5", "D5");
				Ship s6 = new Ship("Destroyer", gp3, location6);
				srepository.save(s6);
				///POST 7
				List<String> location7 = Arrays.asList("C6", "C7");
				Ship s7 = new Ship("Patrol Boat", gp3, location7);
				srepository.save(s7);
				///POST 8
				List<String> location8 = Arrays.asList("A2", "A3", "A4");
				Ship s8 = new Ship("Submarine", gp4, location8);
				srepository.save(s8);
				///POST 9
				List<String> location9 = Arrays.asList("G6", "H6");
				Ship s9 = new Ship("Patrol Boat", gp4, location9);
				srepository.save(s9);
				///POST 10
				List<String> location10 = Arrays.asList("B5", "C5", "D5");
				Ship s10 = new Ship("Destroyer", gp5, location10);
				srepository.save(s10);
				///POST 11
				List<String> location11 = Arrays.asList("C6", "C7");
				Ship s11 = new Ship("Patrol Boat", gp5, location11);
				srepository.save(s11);
				///POST 12
				List<String> location12 = Arrays.asList("A2", "A3", "A4");
				Ship s12 = new Ship("Submarine", gp6, location12);
				srepository.save(s12);
				///POST 13
				List<String> location13 = Arrays.asList("G6", "H6");
				Ship s13 = new Ship("Patrol Boat", gp6, location13);
				srepository.save(s13);
				///POST 14
				List<String> location14 = Arrays.asList("B5", "C5", "D5");
				Ship s14 = new Ship("Destroyer", gp7, location14);
				srepository.save(s14);
				///POST 15
				List<String> location15 = Arrays.asList("C6", "C7");
				Ship s15 = new Ship("Patrol Boat", gp7, location15);
				srepository.save(s15);
				///POST 16
				List<String> location16 = Arrays.asList("A2", "A3", "A4");
				Ship s16 = new Ship("Submarine", gp8, location16);
				srepository.save(s16);
				///POST 17
				List<String> location17 = Arrays.asList("G6", "H6");
				Ship s17 = new Ship("Patrol Boat", gp8, location17);
				srepository.save(s17);
				///POST 18
				List<String> location18 = Arrays.asList("B5", "C5", "D5");
				Ship s18 = new Ship("Destroyer", gp9, location18);
				srepository.save(s18);
				///POST 19
				List<String> location19 = Arrays.asList("C6", "C7");
				Ship s19 = new Ship("Patrol Boat", gp9, location19);
				srepository.save(s19);
				///POST 20
				List<String> location20 = Arrays.asList("A2", "A3", "A4");
				Ship s20 = new Ship("Submarine", gp10, location20);
				srepository.save(s20);
				///POST 21
				List<String> location21 = Arrays.asList("G6", "H6");
				Ship s21 = new Ship("Patrol Boat", gp10, location21);
				srepository.save(s21);
				///POST 22
				List<String> location22 = Arrays.asList("B5", "C5", "D5");
				Ship s22 = new Ship("Destroyer", gp11, location22);
				srepository.save(s22);
				///POST 23
				List<String> location23 = Arrays.asList("C6", "C7");
				Ship s23 = new Ship("Patrol Boat", gp11, location23);
				srepository.save(s23);
				///POST 24
				List<String> location24 = Arrays.asList("B5", "C5", "D5");
				Ship s24 = new Ship("Destroyer", gp15, location24);
				srepository.save(s24);
				///POST 25
				List<String> location25 = Arrays.asList("C6", "C7");
				Ship s25 = new Ship("Patrol Boat", gp15, location25);
				srepository.save(s25);
				///POST 26
				List<String> location26 = Arrays.asList("A2", "A3", "A4");
				Ship s26 = new Ship("Submarine", gp16, location26);
				srepository.save(s26);
				///POST 27
				List<String> location27 = Arrays.asList("G6", "H6");
				Ship s27 = new Ship("Patrol Boat", gp16, location27);
				srepository.save(s27);

			};
		}

	}

