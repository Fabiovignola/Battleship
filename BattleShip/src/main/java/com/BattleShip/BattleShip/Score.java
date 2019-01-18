package com.BattleShip.BattleShip;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.*;
import javax.persistence.ManyToOne;
import static java.util.stream.Collectors.toList;

@Entity
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "player_id")
    private Player player;

    private Double score;
    private Date date;

    public Score() {

    }

    public Score(Double score, Game game, Player player) {
        this.score = score;
        this.game = game;
        this.player = player;
        this.date = new Date();
    }

    public long getId() {
        return id;
    }

    public Game getGame() {
        return game;
    }

    public Player getPlayer() {
        return player;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Double getScore() {
        return score;
    }

    public Date getDate() {
        return date;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
