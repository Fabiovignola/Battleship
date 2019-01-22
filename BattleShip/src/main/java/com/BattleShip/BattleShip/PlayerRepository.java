package com.BattleShip.BattleShip;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

    @RepositoryRestResource
    public interface PlayerRepository extends JpaRepository<Player, Long> {
//        List<Player> findByuserName(String userName);
            Player findByuserName(@Param("userName") String userName);
}

