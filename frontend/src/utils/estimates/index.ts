import type EstimateSection from '@/types/estimateSections/EstimateSection'
import type EstimateSectionTemplate from '@/types/estimateSectionTemplates/EstimateSectionTemplate'

export const convertTemplateToSection = (template: EstimateSectionTemplate): Partial<EstimateSection> => {
  return {
    name: template.name,
    description: template.description,
    related_template: template.id,
  }
}
