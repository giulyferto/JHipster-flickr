package com.auth0.flickr2.service;

import com.auth0.flickr2.domain.Favorites;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Favorites}.
 */
public interface FavoritesService {
    /**
     * Save a favorites.
     *
     * @param favorites the entity to save.
     * @return the persisted entity.
     */
    Favorites save(Favorites favorites);

    /**
     * Updates a favorites.
     *
     * @param favorites the entity to update.
     * @return the persisted entity.
     */
    Favorites update(Favorites favorites);

    /**
     * Partially updates a favorites.
     *
     * @param favorites the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Favorites> partialUpdate(Favorites favorites);

    /**
     * Get all the favorites.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Favorites> findAll(Pageable pageable);

    /**
     * Get the "id" favorites.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Favorites> findOne(Long id);

    /**
     * Delete the "id" favorites.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
