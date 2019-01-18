package com.BattleShip.BattleShip;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.ManyToOne;


@Entity
public class Salvo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gamePlayer_id")
    private GamePlayer gamePlayer;

    @ElementCollection
    @Column(name="salvoLocation")
    private List<String> location = new ArrayList<>();

    private Integer turn;

    public Salvo() {

    }

    public Salvo(Integer turn, GamePlayer gamePlayer, List location) {
        this.turn = turn;
        this.gamePlayer = gamePlayer;
        this.location = location;
    }

    public long getId() {
        return id;
    }

    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }

    public List<String> getLocation() {
        return location;
    }

    public Integer getTurn() {
        return turn;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setGamePlayer(GamePlayer gamePlayer) {
        this.gamePlayer = gamePlayer;
    }

    public void setLocation(List<String> location) {
        this.location = location;
    }

    public void setTurn(Integer salvoType) {
        this.turn = turn;
    }


}
