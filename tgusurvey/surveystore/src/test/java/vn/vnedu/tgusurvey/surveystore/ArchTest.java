package vn.vnedu.tgusurvey.surveystore;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("vn.vnedu.tgusurvey.surveystore");

        noClasses()
            .that()
                .resideInAnyPackage("vn.vnedu.tgusurvey.surveystore.service..")
            .or()
                .resideInAnyPackage("vn.vnedu.tgusurvey.surveystore.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..vn.vnedu.tgusurvey.surveystore.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
