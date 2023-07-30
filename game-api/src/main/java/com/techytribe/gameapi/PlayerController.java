package com.techytribe.gameapi;

import org.apache.logging.log4j.spi.CopyOnWrite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping(path = "/api/v1/player")
@CrossOrigin("*")
public class PlayerController {

    CopyOnWriteArrayList<Player> listOfPlayers = new CopyOnWriteArrayList<>();
    @Autowired
    public PlayerRepository playerRepository;

    //------------------------------------------------------------------------------------------//
    @PostMapping
    public Player createPlayer(@RequestBody Player incomingPlayer) {
        playerRepository.save(incomingPlayer);
        return incomingPlayer;

    }

    //------------------------------------------------------------------------------------------//
    @GetMapping
    public List<Player> getAllPlayer() {
        return playerRepository.findAll();
    }

    //------------------------------------------------------------------------------------------//
    @GetMapping(path = "/{id}")
    public Optional<Player> getSpecificPlayer(@PathVariable String id) {
        return playerRepository.findById(id);
    }

    //------------------------------------------------------------------------------------------//
    @PutMapping(path = "/{id}")
    public Player updateSpecificPlayer(@PathVariable String id, @RequestBody Player incomingPlayer) {
        Player existingPlayer = getSpecificPlayer(id).get();
        existingPlayer.name = incomingPlayer.name;
        playerRepository.save(existingPlayer);
        return existingPlayer;
    }

    //------------------------------------------------------------------------------------------//
    @DeleteMapping(path = "/{id}")
    public Player removeSpecificPlayer(@PathVariable String id) {
        Player existingPlayer = getSpecificPlayer(id).get();
        playerRepository.delete(existingPlayer);
        return existingPlayer;
    }

}
