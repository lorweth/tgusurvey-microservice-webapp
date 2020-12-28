package vn.vnedu.tgusurvey.surveystore.service;

import org.springframework.stereotype.Service;
import vn.vnedu.tgusurvey.surveystore.domain.enumeration.Answer;
import vn.vnedu.tgusurvey.surveystore.repository.ResultSurveyRepository;
import vn.vnedu.tgusurvey.surveystore.service.dto.dataStatisticsDTO;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ResultSurveyService {
    private final ResultSurveyRepository resultSurveyRepository;

    public ResultSurveyService(ResultSurveyRepository resultSurveyRepository){
        this.resultSurveyRepository = resultSurveyRepository;
    }

//    public Map<String, Long> getStatistics(Long idQues){
//        List<Object[]> result = resultSurveyRepository.getCountUserEachAnswer(idQues);
//        Map<String, Long> map = null;
//        if(result != null && !result.isEmpty()){
//            map = new HashMap<String, Long>();
//            for(Object[] object: result){
//                map.put(object[0].toString(), (Long)object[1]);
//            }
//        }
//        return map;
//    }

    public List<dataStatisticsDTO> getStatistics(Long idQues){
        List<Object[]> resultSurveyStatistics = resultSurveyRepository.getCountUserEachAnswer(idQues);
        List<dataStatisticsDTO> result = new ArrayList<>();
        if(resultSurveyStatistics!=null && !resultSurveyStatistics.isEmpty()){
            for (Object[] object: resultSurveyStatistics) {
                result.add(new dataStatisticsDTO((Answer)object[0], (Long)object[1]));
            }
        }
        return result;
    }
}
