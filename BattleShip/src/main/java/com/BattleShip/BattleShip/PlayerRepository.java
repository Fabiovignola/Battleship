package com.BattleShip.BattleShip;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;


@RepositoryRestResource
    public interface PlayerRepository extends JpaRepository<Player, Long> {
//        List<Player> findByuserName(String UserName);
        Player findByuserName(@Param("userName") String userName);
}

