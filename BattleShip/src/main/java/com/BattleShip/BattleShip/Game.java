package com.BattleShip.BattleShip;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
    //    private String firstName;
//    private String lastName;
    private Date date;

    public Game(Date date) { }

    public Game(Date date) {
//        firstName = first;
////        lastName = last;
        this.date = new Date();
    }

    public String getdate() {
        return date;
    }

}
