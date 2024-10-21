import prismaInternals from "@prisma/internals";

type MappedDataModelEntry = {
  modelName: string;
  fieldName: string;
  fieldType: string;
  mappedFieldType: string;
};

const typeMapping = new Map([
  ["String", "string"],
  ["Int", "number"],
  ["Float", "number"],
  ["Boolean", "boolean"],
  ["DateTime", "Date"],
]);

export async function createTIDB(
  datamodelPath: string
): Promise<MappedDataModelEntry[]> {
  const dmmf = await prismaInternals.getDMMF({ datamodelPath });

  const mappedDataModel: MappedDataModelEntry[] = dmmf.datamodel.models.flatMap(
    (model) =>
      model.fields.map((field) => {
        const mappedDataModelEntry: MappedDataModelEntry = {
          modelName: model.name,
          fieldName: field.name,
          fieldType: field.type,
          mappedFieldType: "modelRelation",
        };

        if (field.kind === "object") {
          return mappedDataModelEntry;
        }

        const mappedType = typeMapping.get(field.type);
        if (!mappedType) {
          throw new Error(`Prisma type ${field.type} is not yet supported`);
        }

        mappedDataModelEntry.mappedFieldType = mappedType;
        return mappedDataModelEntry;
      })
  );
  return mappedDataModel;
}

console.table(await createTIDB("./lib/prisma/schema.prisma"));
