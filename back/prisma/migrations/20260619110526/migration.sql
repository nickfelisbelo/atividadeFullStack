-- CreateTable
CREATE TABLE `Turmas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serie` VARCHAR(191) NOT NULL,
    `materia` VARCHAR(191) NOT NULL,
    `professorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Professores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,
    `idTurma` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Turmas` ADD CONSTRAINT `Turmas_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `Professores`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Atividades` ADD CONSTRAINT `Atividades_idTurma_fkey` FOREIGN KEY (`idTurma`) REFERENCES `Turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
