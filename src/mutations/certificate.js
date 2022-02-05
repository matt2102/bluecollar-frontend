import gql from "graphql-tag"
import { certificateDetailsFragment, certificateErrorFragment } from "../fragments/certificate";

export const certificateCreateMutation = gql`
${certificateDetailsFragment}
${certificateErrorFragment}
mutation CertificateCreate(
    $input: CertificateInput!
){certificateCreate(
    input: $input
){
    certificate{
        ...CertificateDetailsFragment
    }
    errors: certificateErrors {
        ...CertificateErrorFragment
    }
}
}
`;