package com.auth0.flickr2.repository;

import com.auth0.flickr2.domain.Favorites;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Favorites entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {}
