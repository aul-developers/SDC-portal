"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  BookOpen,
  AlertTriangle,
  Scale,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Anchor University Lagos - Punishment Handbook Data
// Based on Anchor University's zero-tolerance policy for misconduct
// Reference: aul.edu.ng, DLCF (Deeper Life Campus Fellowship) guidelines
const punishmentHandbook = {
  categories: [
    {
      id: "academic",
      name: "Academic Offences",
      description:
        "Violations related to academic integrity and examination conduct",
      offences: [
        {
          type: "Examination Malpractice",
          severity: "Severe",
          description:
            "Cheating during examinations, possession of unauthorized materials, impersonation, or any form of examination fraud",
          recommendedPunishments: [
            { type: "Suspension (1 Academic Year)", firstOffence: true },
            { type: "Expulsion", firstOffence: false },
          ],
          policyReference: "AUL Student Handbook - Academic Integrity Section",
        },
        {
          type: "Forgery",
          severity: "Severe",
          description:
            "Falsification of academic documents, transcripts, admission documents, or university records",
          recommendedPunishments: [{ type: "Expulsion", firstOffence: true }],
          policyReference: "AUL Student Handbook - Academic Fraud Section",
        },
        {
          type: "Plagiarism",
          severity: "Major",
          description:
            "Submitting another person's work as one's own without proper attribution",
          recommendedPunishments: [
            { type: "Re-submission + Warning", firstOffence: true },
            { type: "Course Failure + Probation", firstOffence: false },
          ],
          policyReference: "AUL Student Handbook - Academic Honesty Section",
        },
      ],
    },
    {
      id: "dress-code",
      name: "Dress Code Violations",
      description:
        "Violations of the university's strict dress code based on Christian principles of modesty",
      offences: [
        {
          type: "Indecent Dressing",
          severity: "Moderate",
          description:
            "Wearing revealing, tight-fitting, or inappropriate clothing. Includes mini-skirts, slit skirts, boob tubes, tops with unholy inscriptions, stiletto/platform shoes for females",
          recommendedPunishments: [
            {
              type: "Warning + Immediate Change of Attire",
              firstOffence: true,
            },
            {
              type: "Suspension (1 Week) + Letter to Parents",
              firstOffence: false,
            },
          ],
          policyReference: "AUL Dress Code Policy - Female Students",
        },
        {
          type: "Improper Male Dressing",
          severity: "Moderate",
          description:
            "Afro-looking hairstyles, braided hair, beards, painted fingernails, long nails, jewelry (necklaces, rings, wristbands), improper shirt/tie wearing",
          recommendedPunishments: [
            { type: "Warning + Immediate Correction", firstOffence: true },
            { type: "Suspension (1 Week)", firstOffence: false },
          ],
          policyReference: "AUL Dress Code Policy - Male Students",
        },
        {
          type: "Unnatural Dressing Style",
          severity: "Minor",
          description:
            "Clothing resembling opposite sex, permed/denatured hair, or attire that distracts attention",
          recommendedPunishments: [
            { type: "Warning + Change of Attire", firstOffence: true },
            { type: "Community Service", firstOffence: false },
          ],
          policyReference: "AUL Dress Code Policy - General",
        },
      ],
    },
    {
      id: "substance",
      name: "Substance Violations (Zero Tolerance)",
      description:
        "Violations related to prohibited substances - Anchor University maintains ZERO TOLERANCE for these offences",
      offences: [
        {
          type: "Hard Drug Use/Possession",
          severity: "Severe",
          description:
            "Taking, possession, distribution, or facilitating access to hard drugs including marijuana, cocaine, and other controlled substances",
          recommendedPunishments: [
            { type: "Expulsion + Report to Police", firstOffence: true },
          ],
          policyReference: "AUL Zero Tolerance Policy - Drug Abuse",
        },
        {
          type: "Alcohol Consumption",
          severity: "Severe",
          description:
            "Drinking alcohol on or off campus, possessing alcoholic beverages, or coming to campus intoxicated",
          recommendedPunishments: [
            { type: "Suspension (1 Semester)", firstOffence: true },
            { type: "Expulsion", firstOffence: false },
          ],
          policyReference: "AUL Zero Tolerance Policy - Alcohol",
        },
        {
          type: "Smoking",
          severity: "Major",
          description:
            "Smoking cigarettes, vaping, or use of tobacco products on or off campus",
          recommendedPunishments: [
            { type: "Suspension (1 Month) + Counseling", firstOffence: true },
            { type: "Suspension (1 Semester)", firstOffence: false },
          ],
          policyReference: "AUL Zero Tolerance Policy - Smoking",
        },
      ],
    },
    {
      id: "moral",
      name: "Moral & Religious Offences",
      description:
        "Violations of Christian moral standards and campus religious expectations",
      offences: [
        {
          type: "Immorality",
          severity: "Severe",
          description:
            "Sexual immorality of any form including fornication, homosexuality, or indecent acts between students",
          recommendedPunishments: [
            { type: "Suspension (1 Academic Year)", firstOffence: true },
            { type: "Expulsion", firstOffence: false },
          ],
          policyReference: "AUL Student Conduct - Moral Standards",
        },
        {
          type: "Immoral Relationship",
          severity: "Major",
          description:
            "Inappropriate relationships violating campus dating policies or unsupervised male-female contact",
          recommendedPunishments: [
            { type: "Probation + Parental Notification", firstOffence: true },
            { type: "Suspension (1 Semester)", firstOffence: false },
          ],
          policyReference: "AUL Student Conduct - Relationship Guidelines",
        },
        {
          type: "Chapel Absence",
          severity: "Minor",
          description:
            "Repeated absence or lateness to mandatory chapel services and religious programs",
          recommendedPunishments: [
            { type: "Warning", firstOffence: true },
            {
              type: "Community Service + Letter to Parents",
              firstOffence: false,
            },
          ],
          policyReference: "AUL Chapel Attendance Policy",
        },
        {
          type: "Disrespect for Religious Practices",
          severity: "Moderate",
          description:
            "Disrupting religious services, mocking religious practices, or refusing to participate in mandatory spiritual activities",
          recommendedPunishments: [
            { type: "Counseling + Warning", firstOffence: true },
            { type: "Probation", firstOffence: false },
          ],
          policyReference: "AUL Religious Conduct Policy",
        },
      ],
    },
    {
      id: "security",
      name: "Security & Criminal Offences (Zero Tolerance)",
      description:
        "Violations affecting campus security - Anchor University has ZERO TOLERANCE for cultism and criminality",
      offences: [
        {
          type: "Cultism",
          severity: "Severe",
          description:
            "Membership in, association with, or participation in activities of secret cults or confraternities. This includes initiation, meetings, or recruitment",
          recommendedPunishments: [
            {
              type: "Expulsion + Report to Security Agencies",
              firstOffence: true,
            },
          ],
          policyReference: "AUL Zero Tolerance Policy - Cultism",
        },
        {
          type: "Stealing/Theft",
          severity: "Severe",
          description:
            "Stealing or unauthorized possession of property belonging to the university, staff, or fellow students",
          recommendedPunishments: [
            {
              type: "Suspension (1 Semester) + Restitution",
              firstOffence: true,
            },
            { type: "Expulsion", firstOffence: false },
          ],
          policyReference: "AUL Student Conduct - Theft",
        },
        {
          type: "Physical Assault",
          severity: "Severe",
          description:
            "Fighting, assault, or physical violence against any member of the university community",
          recommendedPunishments: [
            { type: "Suspension (1 Semester)", firstOffence: true },
            { type: "Expulsion", firstOffence: false },
          ],
          policyReference: "AUL Student Conduct - Violence",
        },
        {
          type: "Vandalism",
          severity: "Major",
          description:
            "Damage or destruction of university property, hostel facilities, or other students' belongings",
          recommendedPunishments: [
            { type: "Full Restitution + Probation", firstOffence: true },
            {
              type: "Suspension (1 Semester) + Restitution",
              firstOffence: false,
            },
          ],
          policyReference: "AUL Property Policy",
        },
      ],
    },
    {
      id: "behavioral",
      name: "Behavioral Offences",
      description: "Violations of general conduct expectations",
      offences: [
        {
          type: "Harassment",
          severity: "Major",
          description:
            "Bullying, intimidation, cyberbullying, or harassment of students or staff members",
          recommendedPunishments: [
            { type: "Suspension (1 Month) + Counseling", firstOffence: true },
            { type: "Suspension (1 Semester)", firstOffence: false },
          ],
          policyReference: "AUL Anti-Harassment Policy",
        },
        {
          type: "Insubordination",
          severity: "Moderate",
          description:
            "Disobedience to university officials, defiance of authority, or refusal to comply with directives",
          recommendedPunishments: [
            { type: "Written Warning", firstOffence: true },
            { type: "Probation", firstOffence: false },
          ],
          policyReference: "AUL Student Conduct - Authority",
        },
        {
          type: "Unauthorized Outing",
          severity: "Minor",
          description:
            "Leaving campus without proper authorization during restricted hours or overnight without permission",
          recommendedPunishments: [
            { type: "Warning + Loss of Weekend Pass", firstOffence: true },
            {
              type: "Parental Notification + Restriction",
              firstOffence: false,
            },
          ],
          policyReference: "AUL Movement Policy",
        },
        {
          type: "Noise/Disturbance",
          severity: "Minor",
          description:
            "Creating noise or disturbance in hostels, classrooms, or campus premises during quiet hours",
          recommendedPunishments: [
            { type: "Warning", firstOffence: true },
            { type: "Community Service", firstOffence: false },
          ],
          policyReference: "AUL Hostel Rules",
        },
      ],
    },
  ],
  policies: [
    { name: "AUL Student Handbook", section: "General Conduct" },
    { name: "Academic Integrity Policy", section: "Section 5.0" },
    { name: "Dress Code Policy", section: "Appendix A" },
    { name: "Zero Tolerance Policy", section: "Cultism, Drugs & Criminality" },
    { name: "Disciplinary Procedures", section: "Section 10.0" },
    { name: "Appeals Process", section: "Section 11.0" },
  ],
};

const severityColors: Record<string, string> = {
  Minor: "bg-blue-100 text-blue-800",
  Moderate: "bg-yellow-100 text-yellow-800",
  Major: "bg-orange-100 text-orange-800",
  Severe: "bg-red-100 text-red-800",
};

interface PunishmentHandbookProps {
  offenceType?: string; // If provided, highlights the relevant offence
}

export function PunishmentHandbook({ offenceType }: PunishmentHandbookProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Find the specific offence if offenceType is provided
  const findOffence = (type: string) => {
    for (const category of punishmentHandbook.categories) {
      const offence = category.offences.find(
        (o) => o.type.toLowerCase() === type.toLowerCase(),
      );
      if (offence) return { category, offence };
    }
    return null;
  };

  const highlightedOffence = offenceType ? findOffence(offenceType) : null;

  // Filter categories and offences based on search
  const filteredCategories = punishmentHandbook.categories
    .map((category) => ({
      ...category,
      offences: category.offences.filter(
        (offence) =>
          searchTerm === "" ||
          offence.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          offence.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.offences.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-sdc-blue" />
        <div>
          <h2 className="text-xl font-semibold text-sdc-navy">
            Punishment Handbook
          </h2>
          <p className="text-sm text-gray-500">
            Reference guide for disciplinary actions and recommended punishments
          </p>
        </div>
      </div>

      {/* Highlighted Offence (if viewing from Pass Judgment) */}
      {highlightedOffence && (
        <Card className="border-sdc-blue border-2 bg-sdc-blue/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-sdc-blue" />
                Recommended Punishment for {highlightedOffence.offence.type}
              </CardTitle>
              <Badge
                className={severityColors[highlightedOffence.offence.severity]}
              >
                {highlightedOffence.offence.severity}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              {highlightedOffence.offence.description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg bg-white p-4 border">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  First Offence
                </p>
                <p className="font-semibold text-sdc-navy">
                  {highlightedOffence.offence.recommendedPunishments.find(
                    (p) => p.firstOffence,
                  )?.type || "N/A"}
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 border">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  Repeat Offence
                </p>
                <p className="font-semibold text-sdc-navy">
                  {highlightedOffence.offence.recommendedPunishments.find(
                    (p) => !p.firstOffence,
                  )?.type || "Same as First"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>{highlightedOffence.offence.policyReference}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search offences or punishments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories Accordion */}
      <Accordion
        type="multiple"
        defaultValue={
          highlightedOffence ? [highlightedOffence.category.id] : []
        }
      >
        {filteredCategories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="text-sdc-navy font-semibold">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                {category.name}
                <Badge variant="outline" className="ml-2">
                  {category.offences.length} offences
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-sm text-gray-500 mb-4">
                {category.description}
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Offence Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>First Offence</TableHead>
                    <TableHead>Repeat Offence</TableHead>
                    <TableHead>Policy Ref.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {category.offences.map((offence) => (
                    <TableRow
                      key={offence.type}
                      className={cn(
                        highlightedOffence?.offence.type === offence.type &&
                          "bg-sdc-blue/10",
                      )}
                    >
                      <TableCell className="font-medium">
                        {offence.type}
                      </TableCell>
                      <TableCell>
                        <Badge className={severityColors[offence.severity]}>
                          {offence.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {offence.recommendedPunishments.find(
                          (p) => p.firstOffence,
                        )?.type || "N/A"}
                      </TableCell>
                      <TableCell>
                        {offence.recommendedPunishments.find(
                          (p) => !p.firstOffence,
                        )?.type || "Same"}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        {offence.policyReference}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Related Policies */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-sdc-blue" />
            Related Policies
          </CardTitle>
          <CardDescription>
            Official university policies governing disciplinary procedures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {punishmentHandbook.policies.map((policy) => (
              <div
                key={policy.name}
                className="flex items-center justify-between rounded-lg border p-3 hover:bg-gray-50 cursor-pointer"
              >
                <div>
                  <p className="font-medium text-sdc-navy">{policy.name}</p>
                  <p className="text-sm text-gray-500">{policy.section}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Export helper function to get recommended punishment for an offence type
export function getRecommendedPunishment(
  offenceType: string,
  isRepeatOffender: boolean = false,
) {
  for (const category of punishmentHandbook.categories) {
    const offence = category.offences.find(
      (o) => o.type.toLowerCase() === offenceType.toLowerCase(),
    );
    if (offence) {
      const punishment = offence.recommendedPunishments.find(
        (p) => p.firstOffence === !isRepeatOffender,
      );
      return punishment?.type || offence.recommendedPunishments[0]?.type;
    }
  }
  return null;
}

export function getOffenceDetails(offenceType: string) {
  for (const category of punishmentHandbook.categories) {
    const offence = category.offences.find(
      (o) => o.type.toLowerCase() === offenceType.toLowerCase(),
    );
    if (offence) {
      return offence;
    }
  }
  return null;
}

export function getCategoryForOffence(offenceType: string) {
  for (const category of punishmentHandbook.categories) {
    const offence = category.offences.find(
      (o) => o.type.toLowerCase() === offenceType.toLowerCase(),
    );
    if (offence) {
      return category;
    }
  }
  return null; // or "Uncategorized"
}

export function getAllCategories() {
  return punishmentHandbook.categories;
}
