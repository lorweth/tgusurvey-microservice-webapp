package vn.vnedu.tgusurvey.surveystore.service;

import org.springframework.stereotype.Service;
import vn.vnedu.tgusurvey.surveystore.domain.Question;
import vn.vnedu.tgusurvey.surveystore.domain.Section;
import vn.vnedu.tgusurvey.surveystore.domain.SurveyForm;
import vn.vnedu.tgusurvey.surveystore.domain.SurveyHeader;

import vn.vnedu.tgusurvey.surveystore.repository.QuestionRepository;
import vn.vnedu.tgusurvey.surveystore.repository.SectionRepository;
import vn.vnedu.tgusurvey.surveystore.repository.SurveyFormRepository;
import vn.vnedu.tgusurvey.surveystore.repository.SurveyHeaderRepository;

import vn.vnedu.tgusurvey.surveystore.service.dto.HeaderDTO;
import vn.vnedu.tgusurvey.surveystore.service.dto.QuestionDTO;
import vn.vnedu.tgusurvey.surveystore.service.dto.SectionDTO;
import vn.vnedu.tgusurvey.surveystore.service.dto.SurveyFormDTO;
import vn.vnedu.tgusurvey.surveystore.web.rest.errors.BadRequestAlertException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SurveyFormService {
    private final QuestionRepository questionRepository;
    private final SectionRepository sectionRepository;
    private final SurveyHeaderRepository surveyHeaderRepository;
    private final SurveyFormRepository surveyFormRepository;

    public SurveyFormService(
        QuestionRepository questionRepository,
        SectionRepository sectionRepository,
        SurveyHeaderRepository surveyHeaderRepository,
        SurveyFormRepository surveyFormRepository
    ){
        this.questionRepository = questionRepository;
        this.sectionRepository = sectionRepository;
        this.surveyHeaderRepository = surveyHeaderRepository;
        this.surveyFormRepository = surveyFormRepository;
    }

    public Optional<SurveyFormDTO> getSurveyFormDTO(Long surveyId){
        Optional<SurveyForm> surveyForm = surveyFormRepository.findOneById(surveyId);
        SurveyFormDTO survey = new SurveyFormDTO();

        if(!surveyForm.isPresent()){
            throw new BadRequestAlertException("Khong tim thay survey form", "GetSurveyFormDTO", "error");
        }

        survey.setId(surveyForm.get().getId());
        survey.setName(surveyForm.get().getName());
        survey.setStartDate(surveyForm.get().getStartDate());
        survey.setEndDate(surveyForm.get().getEndDate());
        survey.setNote(surveyForm.get().getNote());

        List<SurveyHeader> headerList = surveyHeaderRepository.findBySurveyForm_Id(surveyId);
        List<HeaderDTO> headerDTOList = new ArrayList<>();

        for (SurveyHeader header: headerList) {
            HeaderDTO headerDTO = new HeaderDTO();
            headerDTO.setId(header.getId());
            headerDTO.setStt(header.getStt());
            headerDTO.setTitle(header.getTitle());

            List<Section> sections = sectionRepository.findByHeader_Id(header.getId());
            List<SectionDTO> sectionDTOList = new ArrayList<>();

            for (Section section: sections) {
                SectionDTO sectionDTO = new SectionDTO();
                sectionDTO.setId(section.getId());
                sectionDTO.setStt(section.getStt());
                sectionDTO.setTitle(section.getTitle());

                List<Question> questions = questionRepository.findBySection_Id(section.getId());
                List<QuestionDTO> questionDTOList = new ArrayList<>();

                for (Question question: questions) {
                    QuestionDTO questionDTO = new QuestionDTO();

                    questionDTO.setId(question.getId());
                    questionDTO.setContent(question.getContent());

                    questionDTOList.add(questionDTO);
                }

                sectionDTO.setQuestions(questionDTOList);
                sectionDTOList.add(sectionDTO);
            }

            headerDTO.setSections(sectionDTOList);
            headerDTOList.add(headerDTO);
        }
        survey.setHeaders(headerDTOList);

        return Optional.of(survey);
    }
}
