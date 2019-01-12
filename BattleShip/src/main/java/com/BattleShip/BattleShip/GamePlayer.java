package com.BattleShip.BattleShip;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.ManyToOne;

@Entity
public class GamePlayer {
    //fields
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    private Date date;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="game_id")
    private Game game;

    @OneToMany(mappedBy="gamePlayer", fetch=FetchType.EAGER)
    Set<Ship> ships = new HashSet<>();

    //constructores
    public GamePlayer() { }

    public GamePlayer(Player player, Game game){
        this.player = player;
        this.game = game;
    }

    //methods

    public void setPlayer(Player player){
        this.player = player;
    }

    public Player getPlayer() {
        return player;
    }

    public void setGame(Game game){
        this.game = game;
    }

    public Game getGame() {
        return game;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public void setShips(Set<Ship> ships) {
        this.ships = ships;
    }

    public Set<Ship> getShips() {
        return ships;
    }
}

