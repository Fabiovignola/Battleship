package com.BattleShip.BattleShip;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BattleShipApplication {

	public static void main(String[] args) {
		SpringApplication.run(BattleShipApplication.class, args);
	}

		@Bean
		public CommandLineRunner initData(PlayerRepository repository) {
			return (args) -> {
				// save a couple of customers
				repository.save(new Player("j.bauer@ctu.gov"));
				repository.save(new Player("c.obrian@ctu.gov"));
				repository.save(new Player("kim_bauer@gmail.com"));
				repository.save(new Player("t.almeida@ctu.gov"));

			};
		}

		@Bean
		public CommandLineRunner initData(GameRepository repository) {
			return (args) -> {
			// save a couple of customers
				repository.save(new Game("01/02/2018"));
				repository.save(new Game("dd/MM/yyyy"));
				repository.save(new Game("dd/MM/yyyy"));

		};
	}
	}

