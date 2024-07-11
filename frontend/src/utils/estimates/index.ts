import type EstimateSection from '@/types/estimateSections/EstimateSection'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'

export const convertTemplateToSection = (template: EstimateSectionTemplate): Partial<EstimateSection> => {
  return {
    ...template,
  }
}
