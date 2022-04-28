package com.auth0.flickr2.service.impl;

import com.auth0.flickr2.domain.Favorites;
import com.auth0.flickr2.repository.FavoritesRepository;
import com.auth0.flickr2.service.FavoritesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Favorites}.
 */
@Service
@Transactional
public class FavoritesServiceImpl implements FavoritesService {

    private final Logger log = LoggerFactory.getLogger(FavoritesServiceImpl.class);

    private final FavoritesRepository favoritesRepository;

    public FavoritesServiceImpl(FavoritesRepository favoritesRepository) {
        this.favoritesRepository = favoritesRepository;
    }

    @Override
    public Favorites save(Favorites favorites) {
        log.debug("Request to save Favorites : {}", favorites);
        return favoritesRepository.save(favorites);
    }

    @Override
    public Favorites update(Favorites favorites) {
        log.debug("Request to save Favorites : {}", favorites);
        // no save call needed as we have no fields that can be updated
        return favorites;
    }

    @Override
    public Optional<Favorites> partialUpdate(Favorites favorites) {
        log.debug("Request to partially update Favorites : {}", favorites);

        return favoritesRepository
            .findById(favorites.getId())
            .map(existingFavorites -> {
                return existingFavorites;
            })// .map(favoritesRepository::save)
        ;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Favorites> findAll(Pageable pageable) {
        log.debug("Request to get all Favorites");
        return favoritesRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Favorites> findOne(Long id) {
        log.debug("Request to get Favorites : {}", id);
        return favoritesRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Favorites : {}", id);
        favoritesRepository.deleteById(id);
    }
}
