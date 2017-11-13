package be.oak3.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import be.oak3.model.Note;

public interface NoteHibernateRepository extends JpaRepository<Note, Long> {

}
