package com.BattleShip.BattleShip;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@RestController
@RequestMapping("/api")
public class SalvoController {

        @Autowired
        private GameRepository gamerepo;

        @RequestMapping("/games")
        public List<Object> getAllGame(){
            return gamerepo.findAll().stream()
                        .map(g -> makeGameDTO(g))
                        .collect(toList());
        }
        private Map<String, Object>  makeGameDTO(Game game){
                Map<String, Object> DTO= new LinkedHashMap<>();
                DTO.put("id",game.getId());
                DTO.put("date",game.getdate());
                DTO.put("gamePlayers",game.getGamePlayer().stream()
                        .map(gp -> makeGamePlayerDTO(gp)).collect(toList()));
                return DTO;
        }

        private Map<String, Object>  makeGamePlayerDTO(GamePlayer gameplayer){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("id", gameplayer.getId());
                DTO.put("player", makePlayerDTO(gameplayer.getPlayer()));
                return DTO;
        }

        // aquí creo un Map para el player que se me pasa de parametro
        private Map<String, Object>  makePlayerDTO(Player player){
                Map<String, Object> DTO= new HashMap<>();
                DTO.put("id",player.getId());
                DTO.put("email", player.getUserName());
                return DTO;
        }
        /////////////////////////
//        private Map<Type, Object>  makeShipDTO(Player player, GamePlayer gameplayer){
////                Map<Type, Object> DTO= new HashMap<>();
////                DTO.put("id",player.getId());
////                DTO.put("email", player.getUserName());
////                DTO.put("id", gameplayer.getId());
////                return DTO;
////        }



}
