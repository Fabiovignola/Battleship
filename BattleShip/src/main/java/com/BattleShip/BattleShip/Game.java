package com.BattleShip.BattleShip;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.beans.factory.ObjectProvider;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.*;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import static java.util.stream.Collectors.toList;

@Entity
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;


    @OneToMany(mappedBy="game", fetch=FetchType.EAGER)
    Set<GamePlayer> gamePlayer = new HashSet<>();

    private Date date;

    public Game() {
        this.date = new Date();
    }
    public Date getdate() {
        return date;
    }

    public void addGamePlayer (GamePlayer gp) {
        gp.setGame(this);
        this.gamePlayer.add(gp);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Player> getPlayers() {
        return gamePlayer.stream().map(sub -> sub.getPlayer()).collect(toList());
    }

    public Set<GamePlayer> getGamePlayer() {
        return gamePlayer;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setGamePlayer(Set<GamePlayer> gamePlayer) {
        this.gamePlayer = gamePlayer;
    }
}
