package com.BattleShip.BattleShip;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface GameRepository extends JpaRepository<Player, Long> {
    List<Game> findBydate(Date date);

}

//public class GameRepository {
//}
