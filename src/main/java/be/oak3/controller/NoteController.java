package be.oak3.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import be.oak3.model.Note;
import be.oak3.repository.NoteHibernateRepository;

@RestController
@RequestMapping("/")
public class NoteController {

	private NoteHibernateRepository repo;

	// @Autowired
	// private MessageSource source;

	public NoteController(NoteHibernateRepository repo) {
		this.repo = repo;
	}

	@GetMapping(value = "notes")
	public List<Note> showAll() {
		// System.out.println("Source= " + source.getMessage("hello", new String[]
		// {"Awesome"}, Locale.getDefault()));
		return repo.findAll();
	}

	@DeleteMapping(value = "notes/{id}")
	public void delete(@PathVariable Long id) {
		repo.delete(id);
	}

	@RequestMapping(value = "notes", method = RequestMethod.POST)
	public Note create(@RequestBody String text) {
		Note note = new Note();
		note.setText(text);
		return repo.saveAndFlush(note);
	}

	@RequestMapping(value = "notes", method = RequestMethod.DELETE)
	public void deleteAll() {
		repo.deleteAll();
	}
}